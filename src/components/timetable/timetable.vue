<template>
    <div class="timetable-wrapper">
        <div class="timetable">
            <div class="tt-times-wrapper">
                <div class="tt-times">
                    <span class="tt-mark"
                            v-for="timeMark in timeMarks"
                            :key=timeMark>
                        {{ timeMark }}
                    </span>
                </div>
            </div>

            <div class="tt-columns-wrapper">
                <ul class="tt-columns"
                        :style="columnsStyle">
                    <tt-column
                            v-for="item in columns"
                            :key="item.id"
                            :data="item"
                            :time-frame="timeFrame"/>
                </ul>
            </div>
        </div>

        <div class="tt-legend">
            <h3>Legende</h3>
            <div class="tt-legend-content">
                <span class="tt-event event-nugget">Veranstaltung</span>
                <span class="tt-event event-nugget required">Anmeldung benötigt</span>
                <span class="tt-event event-nugget required full">ausgebucht</span>
                <span class="tt-event event-nugget required reserved">als reserviert markiert</span>
                <span class="tt-event event-nugget bookmarked">gemerkt</span>
            </div>
        </div>
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

    get columns(){
        if (this.data[0].location) {
            return this.data.sort((a, b) => {
                return (a.location as IYC.Location).main.id - (b.location as IYC.Location).main.id
            }).map((data: any) => {
                data.id = data.location.id
                return data
            })
        }
        else {
            return this.data.map((data: any) => {
                data.id = data.day.id
                return data
            })
        }
    }

    get timeFrame(){
        const startValues: any = {start: MAX_TIME_SLOTS_DAY, end: 0}
        function reducer(acc: any, cur: any){
            return {
                start: Math.min(acc.start, cur.start),
                end: Math.max(acc.end, cur.end),
            }
        }

        const timeFrame = this.data.map((data) => data.events).flat()
            .map((event: IYC.Event) => event.dates[0].timeslot)
            .reduce(reducer, startValues)

        timeFrame.start = Math.floor(timeFrame.start / 4) * 4
        timeFrame.end = Math.floor(timeFrame.end / 4) * 4 + 4
        timeFrame.duration = timeFrame.end - timeFrame.start
        return timeFrame
    }

    get columnsStyle(){
        return {
            height: `calc(${this.timeFrame.duration * 20}px + 3rem)`,
        }
    }

    get timeMarks(){
        const timeMarks: number[] = []
        const {start, end} = this.timeFrame

        for (let slot = start; slot < end; slot += 4) {
            timeMarks.push(Math.floor(slot / 4) % 24)
        }
        return timeMarks
    }
}
</script>



<style lang="sass">
$light-border: tint($color-btn-background, 10%)
$dark-border: shade($color-btn-background, 10%)

$marked-color: tint($green, 60%)
$light-border-marked: tint($marked-color, 10%)
$dark-border-marked: shade($marked-color, 10%)

$border-width: 2px

.timetable
    position: relative
    left: 50%
    display: flex
    flex-direction: row
    width: 100vw
    margin: 3rem -50vw 5rem

.tt-times-wrapper
    flex: 1 1 auto
    width: 10%
    min-width: 40px
    max-width: 100px
    padding: 3rem 0 0

.tt-mark
    position: relative
    display: block
    height: 80px
    text-align: center

    &::before,
    &::after
        position: absolute
        left: 0
        display: block
        content: ''
        width: 100vw
        height: 1px

    &::before
        top: 0
        background: #666

    &::after
        top: 50%
        background: #999

.tt-columns-wrapper
    flex: 0 1 auto
    overflow: auto
    -webkit-overflow-scrolling: touch

.tt-columns
    display: flex
    flex-direction: row

.tt-legend-content
    display: flex
    flex-flow: row wrap
    margin: -5px

    .tt-event
        margin: 5px
        padding: 5px

.tt-event
    display: block
    width: 200px
    border: $border-width solid
    border-color: $light-border $dark-border $dark-border $light-border
    @extend %event-nugget

    &.bookmarked
        border-color: $light-border-marked $dark-border-marked $dark-border-marked $light-border-marked

</style>
