import axios from 'axios'
import cheerio from 'cheerio'

import {
    getDateId,
    convertCategory,
    convertLocation,
    convertTimeslot,
} from './iyc-event-converter'

import { DEFAULT_CATEGORY } from '@/constants'
import { hash } from '@/lib/helper'


const REGEXS = {
    title: /([^<]*)<span>\(([A-Z, ]{2,})\)<\/span>/,
    date: /([a-zA-Z]+)\s+([0-9]{2}[.:][0-9]{2})\s*-\s*([0-9]{2}[.:][0-9]{2})/,
    category: /([0-9]*).eps.svg/,
    location: /<\/span>([^|<]*)/,
    booking: /\|[\s]*<([a-z]+) ([a-zA-Z0-9\s="-:;#/]*)>([^<]*)<\/[a-z]+>\s+(?:[^|])/,
    bookingID: /booking\/([0-9]*)\/book/,
}


export async function getIycData(): Promise<IYC.Event[]>{
    const { data } = await axios.get('https://www.ijt2019.org/teilnehmen/programm')
    const $ = cheerio.load(data, {normalizeWhitespace: true, decodeEntities: false})
    const events: IYC.RawEvent[] = []
    $('form + div.grid div.col_grid').each((index, ele) => {
        events.push(parseEventEle(ele))
    })

    return consolidateEvents(events)
}

function parseEventEle(ele: CheerioElement): IYC.RawEvent{
    const divs = cheerio(ele).find('> div')
    const dateColEles = cheerio(divs[0]).find('p')
    const contentParagraphs = cheerio(divs[1]).find('p')
    const { title, languages } = splitTitleLanguage(divs[1])
    const locationEle = contentParagraphs[contentParagraphs.length - 1]
    const category = getCategory(dateColEles[1])

    // TODO:
    // different Events with same titles occuring
    // also: identical Events with different titles
    return {
        id: hash(title + category.id),
        title,
        languages,
        timeslot: getTimeslot(dateColEles[0]),
        category,
        synopsis: getSynopsis(contentParagraphs[0]),
        speaker: getSpeaker(contentParagraphs),
        location: getLocation(locationEle),
        booking: getBookingInfo(locationEle),
    }
}

function consolidateEvents(rawEvents: IYC.RawEvent[]): IYC.Event[]{
    const events: IYC.Event[] = []
    rawEvents.forEach((rawEvent) => {
        const id = rawEvent.id
        const event = events.find((ev) => ev.id === id)

        if (event) {
            event.dates.push(getDate(rawEvent))
        }
        else {
            events.push(transformEvent(rawEvent))
        }
    })
    return events
}

function transformEvent(event: IYC.RawEvent): IYC.Event{
    return {
        id: event.id,
        title: event.title,
        category: event.category,
        dates: [getDate(event)],
    }
}

function getDate({ timeslot, languages, location, booking, synopsis, speaker }: IYC.RawEvent): IYC.EventDate{
    const id = getDateId(location, timeslot)
    return { id, timeslot, languages, location, booking, synopsis, speaker }
}

function getHTML(ele: CheerioElement, selector?: string): string{
    const $ = cheerio.load(ele, {decodeEntities: false})
    return selector ? $('h3').html() as string : $.html()
}

function splitTitleLanguage(ele: CheerioElement){
    const html = getHTML(ele, 'h3')
    const matches = REGEXS.title.exec(html)
    if (!matches || matches.length !== 3) {
        throw new Error(`Couldn't parse event title: ${html}`)
    }

    return {
        title: matches[1].trim(),
        languages: matches[2].split(', ') as IYC.Language[],
    }
}

function getTimeslot(ele: CheerioElement){
    const rawDate = cheerio(ele).text().trim()

    if (rawDate.length === 0) {
        return
    }

    const matches = REGEXS.date.exec(rawDate)
    if (!matches || matches.length !== 4) {
        throw new Error(`Couldn't parse event date: ${rawDate}`)
    }
    return convertTimeslot(matches[1], matches[2], matches[3])
}

function getCategory(ele: CheerioElement){
    if (!ele) {
        return DEFAULT_CATEGORY
    }

    const html = getHTML(ele)
    const matches = REGEXS.category.exec(html)
    if (!matches || matches.length !== 2) {
        throw new Error(`Couldn't parse event category: ${html}`)
    }
    return convertCategory(parseInt(matches[1]))
}

function getSynopsis(ele: CheerioElement){
    return cheerio(ele).text().trim()
}

function getSpeaker(eles: Cheerio){
    if (eles.length !== 3) {
        return
    }
    return cheerio(eles[1]).text().trim()
}

function getLocation(ele: CheerioElement): IYC.Location{
    const html = getHTML(ele)
    const matches = REGEXS.location.exec(html)
    if (!matches || matches.length !== 2) {
        throw new Error(`Couldn't parse event location: ${html}`)
    }
    return convertLocation(matches[1].trim())
}

function getBookingInfo(ele: CheerioElement){
    const html = getHTML(ele)
    const matches = REGEXS.booking.exec(html)
    const booking: IYC.BookingInfo = {
        required: false,
        full: false,
        bookmarked: false,
        reserved: false,
    }
    if (!matches || matches.length < 4) {
        return booking
    }

    switch (matches[1]) {
        case 'a':
            const idMatch = REGEXS.bookingID.exec(matches[2])
            booking.required = true
            booking.full = false
            booking.bookingId = idMatch ? idMatch[1] : undefined
            break
        case 'span':
            booking.required = true
            booking.full = true
            break
        default:
            throw new Error(`Couldn't parse event booking info: ${html}`)
    }
    return booking
}
