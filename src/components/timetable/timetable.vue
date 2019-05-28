<template>
    <div class="timetable">
        <div class="tt-times">
            {{ timeFrame }}
        </div>

        <ul class="tt-columns">
            <tt-column
                    v-for="item in data"
                    :key="item.location.id"
                    :data="item"/>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { MAX_TIME_SLOTS_DAY } from '@/constants'

import TtColumn from './ttColumn.vue'

@Component({
    components: {
        TtColumn,
    },
})
export default class TimeTable extends Vue {
    @Prop({type: Array, required: true}) data!: IYC.TimeTableData

    get timeFrame(){
        const startValues = {start: MAX_TIME_SLOTS_DAY, end: 0}
        function reducer(acc: any, cur: any){
            return {
                start: Math.min(acc.start, cur.start),
                end: Math.max(acc.end, cur.end),
            }
        }

        return this.data.map((data) => data.events).flat()
            .map((event: IYC.Event) => event.dates[0].timeslot)
            .reduce(reducer, startValues)
    }
}
</script>



<style scoped lang="sass">
// not empty
</style>
