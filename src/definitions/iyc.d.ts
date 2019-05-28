declare namespace IYC {
    interface Event {
        id: number
        title: string
        category: Category
        synopsis: [{
            language: Language
            text: string
        }]
        speaker?: string
        dates: EventDate[]
    }

    interface SerializedEvent {
        id: number
        title: string
        category: number
        synopsis: [{
            language: Language
            text: string
        }]
        speaker?: string
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
        timeslot?: Timeslot
        languages: Language[]
        location: Location
        booking: BookingInfo
    }

    interface SerializedEventDate {
        timeslot?: SerializedTimeslot
        languages: Language[]
        location: SerializedLocation
        booking: BookingInfo
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
        title: TranslatedString
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
        date: string
        title: TranslatedString
    }

    type TimeTableData = TTColumnData[]

    interface TTColumnData {
        location: IYC.Location
        events: IYC.Event[]
    }

    interface TTTimeFrame {
        start: number
        end: number
        duration: number
    }
}
