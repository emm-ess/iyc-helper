<template>
    <div id="app">
        <iyc-header />

        <div class="container" id="content-wrapper">
            <router-view/>
        </div>

        <footer id="footer">
            <ul>
                <li><button @click="doUpdate" :disabled="!online">{{ updateBtnText }}</button></li>
                <li><router-link to="/about" rel=”nofollow”>Über diese Seite</router-link></li>
                <li><router-link to="/imprint" rel=”nofollow”>Impressum</router-link></li>
                <li><router-link to="/privacy" rel=”nofollow”>Datenschutz</router-link></li>
            </ul>
        </footer>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import IycHeader from '@/components/IycHeader.vue'

@Component({
    components: {
        IycHeader,
    },
})
export default class App extends Vue {
    @Action update!: any

    online: boolean = navigator.onLine
    updateBtnText: string = 'aktualisieren'

    created(){
        window.addEventListener('online', this.handleOnline.bind(this))
        window.addEventListener('offline', this.handleOnline.bind(this))
    }

    handleOnline(){
        this.online = navigator.onLine
    }

    async doUpdate(){
        if (!navigator.onLine) {
            return
        }
        this.updateBtnText = 'aktualisiere...'
        await this.update()
        this.updateBtnText = 'aktualisiert'

        const vm = this
        setTimeout(() => {
            vm.updateBtnText = 'aktualisieren'
        }, 6000)
    }
}
</script>

<style lang="sass">
#app
    display: flex
    flex-direction: column
    height: 100%
    color: #2c3e50

#content-wrapper
    flex: 1 0 auto
    padding-bottom: 30px

#footer
    margin: 2em 0 0
    padding: 0 20px 80px
    background: #f0f0f0

    ul
        display: flex
        flex-flow: row wrap
        justify-content: flex-end
        align-items: center
        height: 100%
        margin: 0 -.6em

    li
        margin: .6em

+breakpoint-up(md)
    #content-wrapper
        margin-top: 60px
        padding-top: 30px
        padding-bottom: 0

    #footer
        height: 60px
        padding-bottom: 0
</style>
