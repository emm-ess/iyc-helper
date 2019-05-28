declare namespace IYC {
    interface Event {
        id: number
        title: string
        category: Category
        dates: EventDate[]
    }

    interface SerializedEvent {
        id: number
        title: string
        category: number
        dates: SerializedEventDate[]
    }

    interface RawEvent {
        id: number
        title: string
        languages: Language[]
        timeslot?: Timeslot
        category: Category
        synopsis: string
        speaker?: string
        location: Location
        booking: BookingInfo
    }

    interface EventDate {
        id: number
        timeslot?: Timeslot
        languages: Language[]
        location: Location
        booking: BookingInfo
        synopsis: string
        speaker?: string
    }

    interface SerializedEventDate {
        timeslot?: SerializedTimeslot
        languages: Language[]
        location: SerializedLocation
        booking: BookingInfo
        synopsis: [{
            language: Language
            text: string
        }]
        speaker?: string
    }

    interface Timeslot {
        day: Day
        start: number
        end: number
        startTime: any
        endTime: any
    }

    interface SerializedTimeslot {
        day: number
        start: number
        end: number
    }

    interface Category {
        id: number
        title: TranslatedString
    }

    type Language = 'DE' | 'EN' | 'FR' | 'RU' | 'ES' | 'IT'

    interface Location {
        id: number
        main: MainLocation
        detail?: string
        events: {
            always: IYC.Event[]
            specific: IYC.Event[]
        }
    }

    interface SerializedLocation {
        main: number
        detail?: string
    }

    interface MainLocation {
        id: number
        slug: string
        title: TranslatedString
        single: boolean
    }

    interface LocationMapper {
        id: number
        regex: TranslatedRegex
    }

    interface BookingInfo {
        required: boolean
        full: boolean
        bookingId?: string
    }

    interface TranslatedString {
        en: string
        de: string
    }

    interface TranslatedRegex {
        de: RegExp
    }

    interface Day {
        id: number
        slug: string
        date: string
        title: TranslatedString
    }

    type TimeTableData = TTColumnData[]

    interface TTColumnData {
        location?: IYC.Location
        day?: IYC.Day
        events: IYC.Event[]
    }

    interface TTTimeFrame {
        start: number
        end: number
        duration: number
    }
}
