<template>
    <li class="tt-event event-nugget"
            :class="booking"
            :style="style">
        <router-link :to="{name: 'detail', params: {id: event.id}}">
            {{ event.title }}
        </router-link>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TtEvent extends Vue {
    @Prop({type: Object, required: true}) event!: IYC.Event
    @Prop({type: Object, required: true}) timeFrame!: IYC.TTTimeFrame

    get date(){
        return this.event.dates[0]
    }

    get booking(){
        return this.date.booking
    }

    get style(){
        const timeFrame = this.timeFrame
        const timeslot = this.date.timeslot as IYC.Timeslot
        const duration = timeslot.end - timeslot.start

        return {
            top: `${100 * (timeslot.start - timeFrame.start) / timeFrame.duration}%`,
            height: `${100 * duration / timeFrame.duration}%`,
        }
    }
}
</script>



<style scoped lang="sass">
.tt-event
    position: absolute

    a
        display: block
        height: 100%
        padding: 5px
        overflow: hidden
        text-overflow: ellipsis
</style>
