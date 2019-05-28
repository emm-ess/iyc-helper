<template>
    <div class="day">
        <h1>Dauerveranstaltungen</h1>
        <div v-for="location in allDayLocations"
                :key="location.id">
            <h2>
                {{ location.main.title.de }}
                <small v-if="location.detail">{{ location.detail }}</small>
            </h2>

            <ul class="permanent-events">
                <li v-for="event in location.events.always"
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

    get allDayLocations(){
        return this.locations.filter((location) => {
            return location.events.always.length > 0
        }).sort((a, b) => a.main.id - b.main.id)
    }
}
</script>


<style scoped lang="sass">
.permanent-events
    display: flex
    flex-flow: row wrap

    a
        display: block
        margin: .6em
        padding: .6em
        background: #efefef
        border-radius: .3em
</style>
