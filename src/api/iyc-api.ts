import axios from 'axios'
import cheerio from 'cheerio'

const REGEXS = {
    title: /([^(]*)\(([A-Z, ]{2,})\)/,
    date: /([a-zA-Z]+)\s+([0-9]{2}[.:][0-9]{2})\s*-\s*([0-9]{2}[.:][0-9]{2})/,
    category: /([0-9]*).eps.svg/,
    location: /<\/span>([^|<]*)/,
    booking: /\|[\s]*<([a-z]+) ([a-zA-Z0-9\s="-:;#/]*)>([^<]*)<\/[a-z]+>\s+(?:[^|])/,
    bookingID: /booking\/([0-9]*)\/book/,
}


export async function getEvents(){
    const { data } = await axios.get('https://www.ijt2019.org/teilnehmen/programm')
    const $ = cheerio.load(data)
    const events: any[] = []
    $('form + div.grid div.col_grid').each((index, ele) => {
        convertEventEle(ele, events)
    })
    return events
}

function convertEventEle(ele: CheerioElement, events: any[]){
    const divs = cheerio(ele).find('> div')
    const dateColEles = cheerio(divs[0]).find('p')
    const contentParagraphs = cheerio(divs[1]).find('p')
    const { title, language } = convertTitle(divs[1])
    const locationEle = contentParagraphs[contentParagraphs.length - 1]
    events.push({
        title,
        language,
        date: getDate(dateColEles[0]),
        category: getCategory(dateColEles[1]),
        synopsis: getSynopsis(contentParagraphs[0]),
        speaker: getSpeaker(contentParagraphs),
        location: getLocation(locationEle),
        booking: getBookingInfo(locationEle),
    })
}

function convertTitle(ele: CheerioElement){
    const titleRaw = cheerio(ele).find('h3').text()
    const matches = REGEXS.title.exec(titleRaw)
    if (!matches || matches.length !== 3) {
        throw new Error(`Couldn't parse event title: ${titleRaw}`)
    }
    return {
        title: matches[1].trim(),
        language: matches[2].split(', '),
    }
}

function getDate(ele: CheerioElement){
    const rawDate = cheerio(ele).text().trim()

    if (rawDate.length === 0) {
        return null
    }

    const matches = REGEXS.date.exec(rawDate)
    if (!matches || matches.length !== 4) {
        throw new Error(`Couldn't parse event date: ${rawDate}`)
    }
    return {
        day: matches[1],
        start: matches[2],
        end: matches[3],
    }
}

function getCategory(ele: CheerioElement){
    if (!ele) {
        return '00'
    }

    const html = cheerio(ele).html() as string
    const matches = REGEXS.category.exec(html)
    if (!matches || matches.length !== 2) {
        throw new Error(`Couldn't parse event category: ${html}`)
    }
    return matches[1]
}

function getSynopsis(ele: CheerioElement){
    return cheerio(ele).text().trim()
}

function getSpeaker(eles: Cheerio){
    if (eles.length !== 3) {
        return null
    }
    return cheerio(eles[1]).text().trim()
}

function getLocation(ele: CheerioElement){
    const html = cheerio(ele).html() as string
    const matches = REGEXS.location.exec(html)
    if (!matches || matches.length !== 2) {
        throw new Error(`Couldn't parse event location: ${html}`)
    }
    return matches[1].trim()
}

function getBookingInfo(ele: CheerioElement){
    const html = cheerio(ele).html() as string
    const matches = REGEXS.booking.exec(html)
    if (!matches || matches.length < 4) {
        return {required: false}
    }

    switch (matches[1]) {
        case 'a':
            const idMatch = REGEXS.bookingID.exec(matches[2])
            return {
                required: true,
                full: false,
                bookingId: idMatch ? idMatch[1] : null,
            }
        case 'span':
            return {
                required: true,
                full: true,
            }
        default:
            throw new Error(`Couldn't parse event booking info: ${html}`)
    }
}
