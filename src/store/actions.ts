import { getIycData } from '@/io/iyc-api'

export const actions = {
    fetchIycData: async ({ commit }: any) => {
        if (navigator.onLine) {
            const events = await getIycData()
            commit('events', events)
        }
    },
}

export default actions
