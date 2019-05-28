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

            <ul class="event-list">
                <li v-for="event in sortEvents(location.events)"
                        :key="event.id">
                    <router-link :to="{name: 'detail', params: {id: event.id}}">
                        {{ event.title }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
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


<style scoped lang="sass">
.event-list
    display: flex
    flex-flow: row wrap

    a
        display: block
        margin: .6em
        padding: .6em
        background: $color-event-link-background
        border-radius: .3em
</style>
