import '@/assets/sass/main.sass'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

// async function test(){
//     const events = await getIycData()
//     console.log(events)
// }
// test()
