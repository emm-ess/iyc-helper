import * as moment from 'moment'

import {
    CATEGORIES,
    MAIN_LOCATIONS,
    LOCATION_MAPPER,
    DAYS,
    DEFAULT_CATEGORY,
} from '@/constants'

const DATE_FORMAT = 'YYYY-MM-DD HH.mm'


export function deserialize(serialized: IYC.SerializedEvent): IYC.Event{
    const event: any = {}
    Object.assign(event, serialized)
    convertCategory(event.category)
    event.dates = serialized.dates.map(deserializeDates)
    return event
}

function deserializeDates(serialized: IYC.SerializedEventDate){
    const date: any = {
        languages: serialized.languages,
        booking: serialized.booking,
    }

    const location = serialized.location
    if (location) {
        date.location = {
            main: MAIN_LOCATIONS[serialized.location.main],
            detail: serialized.location.detail,
        }
    }

    const timeslot = serialized.timeslot
    if (timeslot) {
        const day = DAYS[timeslot.day]
        date.timeslo = {
            day,
            start: convertTime(day.date, timeslot.start),
            end: convertTime(day.date, timeslot.end),
        }
    }
}

export function serialize(event: IYC.Event): IYC.SerializedEvent{
    const serialized: any = {}
    Object.assign(serialized, event)
    serialized.category = event.category.id
    serialized.dates = event.dates.map(serializeDates)
    return serialized
}

function serializeDates(date: IYC.EventDate){
    const serialized: any = {
        languages: date.languages,
        booking: date.booking,
    }

    const location = date.location
    if (location) {
        serialized.location = {
            main: location.main.id,
            detail: location.detail,
        }
    }

    const timeslot = date.timeslot
    if (timeslot) {
        serialized.timeslot = {
            day: timeslot.day.id,
            start: timeslot.start.format(DATE_FORMAT),
            end: timeslot.end.format(DATE_FORMAT),
        }
    }

    return serialized
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

    const location: IYC.Location = {
        main: MAIN_LOCATIONS[i],
    }
    switch (i) {
        case 1:
            location.detail = rawLocation
            break
        case 8: case 9: case 10: case 11:
            location.detail = match['detail']
            break
        default:
            break
    }
    return location
}

export function convertTimeslot(rawDay: string, rawStart: string, rawEnd: string): IYC.Timeslot{
    const day = DAYS.find((ele) => ele.title.de === rawDay)
    if (!day) {
        throw new Error(`Couldn't convert event day: ${rawDay}`)
    }
    return {
        day,
        start: convertTime(day.date, rawStart),
        end: convertTime(day.date, rawEnd),
    }
}

function convertTime(date: string, time: string){
    return (moment as any)(`${date} ${time}`, DATE_FORMAT)
}
