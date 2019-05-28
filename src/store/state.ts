import { getAllEvents } from '@/io/storage'
import { getLocations } from '@/lib/iyc-event-filter'

const events = getAllEvents()
const locations = getLocations(events)

export const state = {
    initialized: false,
    events,
    locations,
}

export default state
