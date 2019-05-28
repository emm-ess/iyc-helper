<template>
    <div class="day">
        <h2>{{ day.title.de }}</h2>
        <time-table :data="ttData"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { DAYS } from '@/constants'
import { filterByDay } from '@/lib/iyc-event-filter'

import TimeTable from '@/components/timetable/timetable.vue'

@Component({
    components: {
        TimeTable,
    },
})
export default class Day extends Vue {
    @Prop({type: String, required: true}) slug!: string
    @Getter getLocationsForDay!: any

    day!: IYC.Day

    created(){
        const day = DAYS.find((day) => day.slug === this.slug)
        if (day) {
            this.day = day
        }
        else {
            this.$router.replace('/')
        }
    }

    get locations(): IYC.Location[]{
        return this.getLocationsForDay(this.day)
    }

    get ttData(){
        return this.locations.map((location) => {
            return {
                location,
                events: filterByDay(location.events.specific, this.day),
            }
        }).filter(({events}: IYC.TTColumnData) => events.length > 0)
    }
}
</script>
