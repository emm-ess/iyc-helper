<template>
    <div class="day">
        <h1>Dauerveranstaltungen</h1>
        <div v-for="location in allDayLocations"
                :key="location.id">
            <h2>
                {{ location.main.title.de }}
                <small v-if="location.detail">{{ location.detail }}</small>
            </h2>

            <event-list :events="location.events.always" />
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

    get allDayLocations(){
        return this.locations.filter((location) => {
            return location.events.always.length > 0
        }).sort((a, b) => a.main.id - b.main.id)
    }
}
</script>
