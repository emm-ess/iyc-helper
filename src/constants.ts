export const CATEGORIES: IYC.Category[] = [
    {id: 0, title: {de: 'Default', en: ''}},
    {id: 1, title: {de: 'Musik', en: ''}},
    {id: 10, title: {de: 'Vortrag', en: ''}},
    {id: 11, title: {de: 'Workshop', en: ''}},
    {id: 12, title: {de: '??', en: ''}},
    {id: 13, title: {de: 'Podiumsgespräch', en: ''}},
    {id: 14, title: {de: 'Gottesdienst', en: ''}},
    {id: 15, title: {de: 'Andacht', en: ''}},
    {id: 16, title: {de: '??', en: ''}},
    {id: 17, title: {de: 'Spiel', en: ''}},
    {id: 22, title: {de: 'Aktivität', en: ''}},
    {id: 23, title: {de: 'Sport/Spiel', en: ''}},
    {id: 24, title: {de: 'Seelsorge', en: ''}},
    {id: 28, title: {de: '??', en: ''}},
    {id: 30, title: {de: '??', en: ''}},
    {id: 31, title: {de: '??', en: ''}},
]

export const DEFAULT_CATEGORY = CATEGORIES[0]

export const MAIN_LOCATIONS: IYC.MainLocation[] = [
    {id: 0, title: {de: 'Arena', en: ''}},
    {id: 1, title: {de: 'Outdoor', en: ''}},
    {id: 2, title: {de: 'Halle 5', en: ''}},
    {id: 3, title: {de: 'Halle 6', en: ''}},
    {id: 4, title: {de: 'Halle 7a', en: ''}},
    {id: 5, title: {de: 'Halle 8a', en: ''}},
    {id: 6, title: {de: 'Halle 8b', en: ''}},
    {id: 7, title: {de: 'Halle 7.0', en: ''}},
    {id: 8, title: {de: 'Halle 7.1', en: ''}},
    {id: 9, title: {de: 'Halle 7.2', en: ''}},
    {id: 10, title: {de: 'CCD-Süd', en: ''}},
    {id: 11, title: {de: 'CCD-Ost', en: ''}},
]

export const LOCATION_MAPPER: IYC.LocationMapper[] = [
    {id: 0, regex: {de: /(?<main>arena)/i}},
    {id: 1, regex: {de: /(?<main>eingangsbereich|open-air|messegel&#xE4;nde|stra&#xDF;enmusik|bulli)/i}},
    {id: 2, regex: {de: /(?<main>halle\s*5)/i}},
    {id: 3, regex: {de: /(?<main>halle\s*6)/i}},
    {id: 4, regex: {de: /(?<main>halle\s*7a)/i}},
    {id: 5, regex: {de: /(?<main>halle\s*8a)/i}},
    {id: 6, regex: {de: /(?<main>halle\s*8b)/i}},
    {id: 7, regex: {de: /(?<main>halle\s*7\.0)/i}},
    {id: 8, regex: {de: /(?<main>halle\s*7\.1)(?:,*\s*)(?<detail>[\S\s]*)/i}},
    {id: 9, regex: {de: /(?<main>halle\s*7\.2)(?:,*\s*)(?<detail>[\S\s]*)/i}},
    {id: 10, regex: {de: /(?<main>ccd-s&#xFC;d)(?:,*\s*)(?<detail>[\S\s]*)/i}},
    {id: 11, regex: {de: /(?<main>ccd-ost)(?:,*\s*)(?<detail>[\S\s]*)/i}},
]

export const LANGUAGES: IYC.Language[] = ['DE', 'EN', 'FR', 'RU', 'ES', 'IT']

export const DAYS: IYC.Day[] = [
    {id: 0, date: '2019-05-30', title: {de: 'Donnerstag', en: ''}},
    {id: 1, date: '2019-05-31', title: {de: 'Freitag', en: ''}},
    {id: 2, date: '2019-06-01', title: {de: 'Samstag', en: ''}},
    {id: 3, date: '2019-06-02', title: {de: 'Sonntag', en: ''}},
]
