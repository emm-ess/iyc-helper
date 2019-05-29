import * as moment from 'moment'

import {
    CATEGORIES,
    MAIN_LOCATIONS,
    LOCATION_MAPPER,
    DAYS,
    DEFAULT_CATEGORY,
    MAX_TIME_SLOTS_DAY,
} from '@/constants'
import { hash } from '@/lib/helper'



export function deserialize(serialized: IYC.SerializedEvent): IYC.Event{
    const event: any = {}
    Object.assign(event, serialized)
    event.category = convertCategory(event.category)
    event.dates = serialized.dates.map(deserializeDates)
    return event
}

function deserializeDates(serialized: IYC.SerializedEventDate): IYC.EventDate{
    const date: any = {
        languages: serialized.languages,
        booking: serialized.booking,
        speaker: serialized.speaker,
        synopsis: serialized.synopsis,
    }

    const location = serialized.location
    if (location) {
        const main = MAIN_LOCATIONS[serialized.location.main]
        const detail = serialized.location.detail
        const id = detail ? hash(main.id + detail) : hash('' + main.id)
        const events = {always: [], specific: []}
        date.location = {id, main, detail, events}
    }

    date.timeslot = deserializeTimeslot(serialized.timeslot)
    date.id = getDateId(date.location, date.timeslot)
    return date
}

function deserializeTimeslot(serialized?: IYC.SerializedTimeslot){
    if (!serialized) {
        return
    }

    const timeslot: any = Object.assign({}, serialized)
    const day = timeslot.day = DAYS[timeslot.day]
    timeslot.startTime = convertSlotToTime(day, timeslot.start)
    timeslot.endTime = convertSlotToTime(day, timeslot.end)
    return timeslot
}

export function serialize(event: IYC.Event): IYC.SerializedEvent{
    const serialized: any = {}
    Object.assign(serialized, event)
    serialized.category = event.category.id
    serialized.dates = event.dates.map(serializeDates)
    return serialized
}

function serializeDates(date: IYC.EventDate): IYC.SerializedEventDate{
    const serialized: any = {
        languages: date.languages,
        booking: date.booking,
        synopsis: date.synopsis,
        speaker: date.speaker,
    }

    const location = date.location
    if (location) {
        serialized.location = {
            main: location.main.id,
            detail: location.detail,
        }
    }
    serialized.timeslot = serializeTimeslot(date.timeslot)

    return serialized
}

function serializeTimeslot(timeslot?: IYC.Timeslot){
    if (!timeslot) {
        return
    }
    return {
        day: timeslot.day.id,
        start: timeslot.start,
        end: timeslot.end,
    }
}

export function getDateId(location: IYC.Location, timeslot?: IYC.Timeslot){
    let id = location.id
    if (timeslot) {
        id += timeslot.day.id
        id += timeslot.start
        id += timeslot.end
    }
    return id
}

export function convertCategory(catId: number){
    const category = CATEGORIES.find((cat) => cat.id === catId)
    if (!category) {
        return DEFAULT_CATEGORY
    }
    return category
}

export function convertLocation(rawLocation: string): IYC.Location{
    let match: any | null = null
    let i = 0
    while (!match && i < LOCATION_MAPPER.length) {
        match = LOCATION_MAPPER[i].regex.de.exec(rawLocation)
        i++
    }

    i--

    if (!match) {
        throw new Error(`Couldn't map event location: ${rawLocation}`)
    }

    const main = MAIN_LOCATIONS[i]
    let detail: string | undefined
    switch (i) {
        case 1:
            detail = rawLocation
            break
        case 8: case 9: case 10: case 11:
            detail = match.groups.detail
            break
        default:
            break
    }

    const id = detail ? hash(main.id + detail) : hash('' + main.id)
    const events = {always: [], specific: []}
    return {id, main, detail, events}
}

export function convertTimeslot(rawDay: string, rawStart: string, rawEnd: string): IYC.Timeslot{
    const day = DAYS.find((ele) => ele.title.de === rawDay)
    if (!day) {
        throw new Error(`Couldn't convert event day: ${rawDay}`)
    }

    const start = convertRawTime(day.date, rawStart)
    const end = convertRawTime(day.date, rawEnd)

    return {
        day,
        start: start.slot,
        end: end.slot,
        startTime: start.time,
        endTime: end.time,
    }
}

const DATE_FORMAT = 'YYYY-MM-DD HH.mm'
function convertRawTime(date: string, rawTime: string){
    const split = rawTime.split('.')
    return {
        slot: convertTimeToSlot(split[0], split[1]),
        time: (moment as any)(`${date} ${rawTime}`, DATE_FORMAT),
    }
}

function convertTimeToSlot(h: string|number, m: string|number){
    if (typeof h === 'string') {
        h = parseInt(h)
    }
    if (typeof m === 'string') {
        m = parseInt(m)
    }
    const slot = Math.round(h * 4 + (m / 15))
    return slot < 28 ? slot + MAX_TIME_SLOTS_DAY : slot
}

function convertSlotToTime(day: IYC.Day, slot: number){
    const h = Math.floor(slot / 4)
    const m = Math.round((slot - (h * 4)) * 15)
    return (moment as any)(`${day.date} ${h}.${m}`, DATE_FORMAT)
}


export function mergeEvents(oldEvent: IYC.Event, newEvent: IYC.Event){
    oldEvent.title = newEvent.title
    const oldDates = oldEvent.dates

    newEvent.dates.forEach((newDate) => {
        const oldDate = oldDates.find((item) => item.id === newDate.id)

        if (oldDate) {
            const tmp = Object.assign({}, oldDate, newDate)
            tmp.booking = oldDate.booking
            tmp.booking.full = newDate.booking.full
            Object.assign(oldDate, tmp)
        }
        else {
            oldDates.push(newDate)
        }
    })

    return oldEvent
}
