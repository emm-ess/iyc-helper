import { filterByDay } from '@/lib/iyc-event-filter'

export const getters = {
    getEventById: (state: any) => (id: number) => {
        return state.events.find((event: IYC.Event) => event.id === id)
    },
    getEventsForDay: (state: any) => (day: IYC.Day | number) => {
        return filterByDay(state.events, day)
    },
    getEventsForLocationOnDay: (state: any) => (location: IYC.Location | number, day: IYC.Day | number) => {
        location = typeof location === 'number' ? location : location.id
        const stLocation = state.locations.find((loc: IYC.Location) => loc.id === location)
        return filterByDay(stLocation.events, day)
    },

    getLocationById: (state: any) => (id: number) => {
        return state.locations.find((location: IYC.Location) => location.id === id)
    },
    getDetailLocations: (state: any) => (loc: IYC.MainLocation | number) => {
        loc = typeof loc === 'number' ? loc : loc.id
        return state.locations.filter((location: IYC.Location) => {
            return location.main.id === loc
        })
    },
    getLocationsForDay: (state: any) => (day: IYC.Day | number) => {
        day = typeof day === 'number' ? day : day.id
        return state.locations.filter((location: IYC.Location) => {
            const events = filterByDay(location.events.specific, day)
            return events.length + location.events.always.length > 0
        })
    },
}

export default getters
