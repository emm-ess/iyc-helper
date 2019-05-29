import { getIycData } from '@/io/iyc-api'
import { getAllEvents } from '@/io/storage'


export const actions = {
    init: async ({ commit }: any) => {
        commit('events', getAllEvents())

        if (navigator.onLine) {
            const events = await getIycData()
            commit('events', events)
        }

        commit('initialized', true)
    },
    update: async ({ commit }: any) => {
        if (navigator.onLine) {
            const events = await getIycData()
            commit('events', events)
        }
    },
}

export default actions
