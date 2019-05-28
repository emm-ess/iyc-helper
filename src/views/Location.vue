<template>
    <div class="location">
        <h2>{{ location.title.de }}</h2>
        <div v-if="location.single">
            <time-table :data="ttDataSingle"/>
        </div>
        <div v-else>
            <div v-for="data in ttDateMulti"
                    :key="data.day.id">
                <h3>{{ data.day.title.de }}</h3>
                <time-table :data="data.data"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { MAIN_LOCATIONS, DAYS } from '@/constants'
import { filterByDay } from '@/lib/iyc-event-filter'

import TimeTable from '@/components/timetable/timetable.vue'

@Component({
    components: {
        TimeTable,
    },
})
export default class Location extends Vue {
    @Prop({type: String, required: true}) slug!: string
    @Getter getDetailLocations!: any

    location!: IYC.MainLocation

    created(){
        const location = MAIN_LOCATIONS.find((location) => {
            return location.slug === this.slug
        })
        if (location) {
            this.location = location
        }
        else {
            this.$router.replace('/')
        }
    }

    get ttDataSingle(){
        const location = this.getDetailLocations(this.location)[0]
        return DAYS.map((day) => {
            return {
                day,
                events: filterByDay(location.events.specific, day),
            }
        }).filter((data) => {
            return data.events.length > 0
        })
    }

    get ttDateMulti(){
        const locations = this.getDetailLocations(this.location)
        return DAYS.map((day) => {
            return {
                day,
                data: locations.map((location: IYC.Location) => {
                    return {
                        location,
                        events: filterByDay(location.events.specific, day),
                    }
                }).filter(({events}: IYC.TTColumnData) => events.length > 0),
            }
        }).filter((data) => data.data.length > 0)
    }
}
</script>
