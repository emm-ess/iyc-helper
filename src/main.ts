import '@/assets/sass/main.sass'

import Vue from 'vue'
import Component from 'vue-class-component'

import VueMeta from 'vue-meta'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueMeta)


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
