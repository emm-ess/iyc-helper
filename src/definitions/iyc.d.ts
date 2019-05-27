declare namespace IYC {
    interface Event {
        title: string;
        language: string;
        date?: EventDate;
        category: Category;
        synopsis: string;
        speaker: string;
        location: Location;
        booking: BookingInfo;
    }

    interface Language {
        id: number;
        title: string;
    }

    interface EventDate {
        day: any;
        start: any;
        end: any;
    }

    interface Category {
        id: number;
        title: string;
    }

    interface Location {
        id: number;
        title: string;
    }

    interface BookingInfo {
        required: boolean;
    }
}
