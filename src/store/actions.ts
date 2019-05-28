import { getIycData } from '@/io/iyc-api'

export const actions = {
    init: async ({ commit }: any) => {
        if (navigator.onLine) {
            const events = await getIycData()
            commit('events', events)
        }
        commit('initialized', true)
    },
}

export default actions
