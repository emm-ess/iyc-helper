import { filterByDay } from '@/lib/iyc-event-filter'

export const getters = {
    getEventsForDay: (state: any) => (day: IYC.Day | number) => {
        return filterByDay(state.events, day)
    },
    getEventsForLocationOnDay: (state: any) => (location: IYC.Location | number, day: IYC.Day | number) => {
        location = typeof location === 'number' ? location : location.id
        const stLocation = state.locations.find((loc: IYC.Location) => loc.id === location)
        return filterByDay(stLocation.events, day)
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
