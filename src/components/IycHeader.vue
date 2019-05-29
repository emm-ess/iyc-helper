<template>
    <header class="header" :class="{open}">
        <div class="nav-toggle-wrapper container">
            <button class="nav-toggle"
                    @click.prevent="toggleNav">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
        <nav class="nav container">
            <ul>
                <li @click="closeNav"><router-link to="/">Home</router-link></li>
                <li @click="closeNav"><router-link to="/day/donnerstag">Donnerstag</router-link></li>
                <li @click="closeNav"><router-link to="/day/freitag">Freitag</router-link></li>
                <li @click="closeNav"><router-link to="/day/samstag">Samstag</router-link></li>
                <li @click="closeNav"><router-link to="/day/sonntag">Sonntag</router-link></li>
                <li @click="closeNav"><router-link to="/events/permanent">Dauerveranstaltungen</router-link></li>
                <li @click="closeNav"><router-link to="/events">Alle Veranstaltungen</router-link></li>
            </ul>
        </nav>
    </header>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class IycHeader extends Vue {
    open = false

    toggleNav(){
        this.open = !this.open
    }

    closeNav(){
        this.open = false
    }
}
</script>

<style lang="sass" scoped>
.header
    position: fixed
    bottom: 0
    left: 0
    z-index: 400
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    padding: 0
    background: #f0f0f0
    transform: translateY(calc(100% - 60px))
    transition: transform .6s ease-in-out

    &.open
        transform: translateY(0)

.nav-toggle-wrapper
    display: flex
    flex: 0 0 auto
    flex-direction: row
    justify-content: flex-end
    align-items: center
    height: 60px
    background: #f0f0f0

.nav-toggle
    width: 40px
    height: 35px
    padding: 8px 5px
    background: none
    border: 1px solid #333
    border-radius: .6em

    .bar
        display: block
        width: 100%
        height: 3px
        margin: 0 auto
        background: #333
        border-radius: 1.5px

    .bar + .bar
        margin-top: 4px

.nav
    display: flex
    flex: 1 0 auto
    align-items: center
    padding-bottom: 60px

    li
        display: block
        margin: 1.2em 0

    a
        color: #2c3e50
        font-weight: bold

        &.router-link-exact-active
            color: #42b983

+breakpoint-up(lg)
    .header
        top: 0
        bottom: initial
        height: 60px
        padding: 0
        transform: translateY(0)

        .nav-toggle-wrapper
            display: none

    .nav
        margin: 0 auto
        padding-bottom: 0

        ul
            display: flex
            flex-direction: row
            justify-content: flex-start
            align-items: center

            li + li
                margin: 0 0 0 1.5em
</style>
