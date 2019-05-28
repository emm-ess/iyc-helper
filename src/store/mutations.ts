import { saveEvent } from '@/io/storage'

export const mutations = {
    initialized: (state: any, initialized: boolean) => {
        state.initialized = initialized
    },
    events: (state: any, eventData: IYC.Event[]) => {
        const stEvents = state.events as IYC.Event[]
        const stLocations = state.locations as IYC.Location[]

        eventData.forEach((newEvent) => {
            const id = newEvent.id
            const oldEvent = stEvents.find((event) => event.id === id)
            let event: IYC.Event

            if (oldEvent) {
                event = Object.assign(oldEvent, newEvent)
            }
            else {
                stEvents.push(newEvent)
                event = newEvent
            }

            saveEvent(event)

            event.dates.forEach((date) => {
                const dateLocId = date.location.id
                let locationEntry = stLocations.find((location) => {
                    return location.id === dateLocId
                })
                if (locationEntry) {
                    date.location = locationEntry
                }
                else {
                    locationEntry = date.location
                    stLocations.push(locationEntry)
                }

                if (event.dates[0].timeslot) {
                    locationEntry.events.specific.push(event)
                }
                else {
                    locationEntry.events.always.push(event)
                }
            })
        })
    },
}

export default mutations
