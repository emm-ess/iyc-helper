import '@/assets/sass/main.sass'

import Vue from 'vue'
import Component from 'vue-class-component'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false


Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
])

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
