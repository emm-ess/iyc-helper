<template>
    <div class="day">
        <h2>{{ day.title.de }}</h2>
        <time-table :data="ttData"/>

        <!-- <h3>Den ganzen Tag</h3>
        <ul>
            <li v-for="location in allDayLocations"
                    :key="location.id">
                {{ location.main.title.de }}

                <ul>
                    <li v-for="event in location.events.always"
                            :key="event.id">
                        {{ event.title }}
                    </li>
                </ul>
            </li>
        </ul> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { filterByDay } from '@/lib/iyc-event-filter'

import TimeTable from '@/components/timetable/timetable.vue'

@Component({
    components: {
        TimeTable,
    },
})
export default class IcyDay extends Vue {
    @Prop({type: Object, required: true}) day!: IYC.Day
    @Getter getLocationsForDay!: any

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

    get allDayLocations(){
        return this.locations.filter((location) => {
            return location.events.always.length > 0
        })
    }
}
</script>
