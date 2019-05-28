import { getAllEvents } from '@/io/storage'

export const state = {
    events: getAllEvents(),
}

export default state
