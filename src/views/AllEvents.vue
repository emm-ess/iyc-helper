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
