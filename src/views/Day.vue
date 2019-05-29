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

    day: IYC.Day | null = null

    created(){
        if (!this.setDay(this.slug)) {
            this.$router.replace('/')
        }
    }

    beforeRouteUpdate(to: any, from: any, next: any){
        if (this.setDay(to.params.slug)) {
            next()
        }
        else {
            next('/')
        }
    }

    setDay(slug: string){
        const day = DAYS.find((day) => day.slug === slug)
        if (day) {
            this.day = day
        }
        return !!day
    }

    get locations(): IYC.Location[]{
        return this.getLocationsForDay(this.day)
    }

    get ttData(){
        return this.locations.map((location) => {
            return {
                location,
                events: filterByDay(location.events.specific, this.day as IYC.Day),
            }
        }).filter(({events}: IYC.TTColumnData) => events.length > 0)
    }
}
</script>
