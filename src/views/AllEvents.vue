<template>
    <div class="day">
        <h1>Alle Veranstaltungen</h1>
        <div v-for="location in sortedLocations"
                :key="location.id">
            <h2>
                <router-link :to="{name: 'location', params: {slug: location.main.slug}}">
                    {{ location.main.title.de }}
                </router-link>
                <small v-if="location.detail">{{ location.detail }}</small>
            </h2>

            <event-list :events="sortEvents(location.events)" />
        </div>

        <div class="legend">
            <h3>Legende</h3>
            <div class="legend-content">
                <span class="event event-nugget">Veranstaltung</span>
                <span class="event event-nugget required">Anmeldung benötigt</span>
                <span class="event event-nugget required full">ausgebucht</span>
                <span class="event event-nugget required reserved">als reserviert markiert</span>
                <span class="event event-nugget bookmarked">gemerkt</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import EventList from '@/components/EventList.vue'

@Component({
    components: {
        EventList,
    },
})
export default class Permanent extends Vue {
    @State locations!: IYC.Location[]

    get sortedLocations(){
        return this.locations.sort((a, b) => a.main.id - b.main.id)
    }

    sortEvents({always, specific}: any){
        return [...always, ...specific]
    }
}
</script>


<style lang="sass" scoped>
.legend
    margin: 60px 0 0

.legend-content
    display: flex
    flex-flow: row wrap
    margin: 0 -.6em

    .event-nugget
        margin: .6em
        padding: .6em
        overflow: hidden
        border-radius: .3em

        &.required
            &::before
                top: 0
                left: 0
                height: 100%
</style>
