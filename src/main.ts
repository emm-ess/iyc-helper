import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

import { getEvents } from '@/api/iyc-api'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

async function test(){
    const events = await getEvents()
    console.log(events)
}
test()
