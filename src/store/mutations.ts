import { saveEvent } from '@/io/storage'

export const mutations = {
    events: (state: any, eventData: IYC.Event[]) => {
        const stEvents = state.events as IYC.Event[]
        eventData.forEach((newEvent) => {
            const id = newEvent.id
            const oldEvent = stEvents.find((event) => event.id === id)

            if (oldEvent) {
                Object.assign(oldEvent, newEvent)
                saveEvent(oldEvent)
            }
            else {
                stEvents.push(newEvent)
                saveEvent(newEvent)
            }
        })
    },
}

export default mutations
