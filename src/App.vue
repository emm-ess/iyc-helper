<template>
    <div id="app">
        <header id="header" :class="{open}">
            <div class="nav-toggle-wrapper container">
                <button @click.prevent="toggleNav">
                    Menu
                </button>
            </div>
            <nav id="nav" class="container">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/day/donnerstag">Donnerstag</router-link></li>
                    <li><router-link to="/day/freitag">Freitag</router-link></li>
                    <li><router-link to="/day/samstag">Samstag</router-link></li>
                    <li><router-link to="/day/sonntag">Sonntag</router-link></li>
                    <li><router-link to="/events/permanent">Dauerveranstaltungen</router-link></li>
                    <li><router-link to="/events">Alle Veranstaltungen</router-link></li>
                </ul>
            </nav>
        </header>

        <div class="container" id="content-wrapper">
            <router-view/>
        </div>

        <footer id="footer">
            <ul>
                <li><router-link to="/about">Über diese Seite</router-link></li>
                <li><router-link to="/imprint">Impressum</router-link></li>
                <li><router-link to="/privacy">Datenschutz</router-link></li>
            </ul>
        </footer>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    open = false

    toggleNav(){
        this.open = !this.open
    }
}
</script>

<style lang="sass">
#app
    display: flex
    flex-direction: column
    height: 100%
    color: #2c3e50

#header
    position: fixed
    bottom: 0
    left: 0
    z-index: 400
    width: 100%
    padding: 60px 0
    background: #f0f0f0
    transform: translateY(100%)
    transition: transform .6s ease-in-out

    &.open
        transform: translateY(0)

    .nav-toggle-wrapper
        position: absolute
        top: -60px
        display: flex
        flex-direction: row
        justify-content: flex-end
        align-items: center
        height: 60px
        background: #f0f0f0

#nav
    margin: 1em 0 3em

    li
        display: block
        margin: 1.2em 0

    a
        color: #2c3e50
        font-weight: bold

        &.router-link-exact-active
            color: #42b983

#content-wrapper
    flex: 1 0 auto
    margin-bottom: 60px
    padding-bottom: 30px

#footer
    margin: 2em 0 0
    padding: 0 20px

    ul
        display: flex
        flex-flow: row wrap
        justify-content: flex-end
        margin: 0 -.6em

    li
        margin: .6em

+breakpoint-up(md)
    #header
        top: 0
        bottom: initial
        transform: translateY(-100%)

        .nav-toggle-wrapper
            top: initial
            bottom: -60px

    #content-wrapper
        margin-top: 60px
        margin-bottom: 0
        padding-top: 30px
        padding-bottom: 0

+breakpoint-up(lg)
    #header
        padding: 0
        transform: translateY(0)

        .nav-toggle-wrapper
            display: none

    #nav
        height: 60px
        margin: 0 auto

        ul
            display: flex
            flex-direction: row
            justify-content: flex-start
            align-items: center

            li + li
                margin: 0 0 0 1.5em
</style>
