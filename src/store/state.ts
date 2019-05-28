import { getAllEvents } from '@/io/storage'
import { getLocations } from '@/lib/iyc-event-filter'

const events = getAllEvents()
const locations = getLocations(events)

export const state = {
    events,
    locations,
}

export default state
