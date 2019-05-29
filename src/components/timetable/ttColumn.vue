<template>
    <li class="tt-column"
            :class="`max-pushes-${maxPushes}`">
        <dl>
            <dt class="tt-column-title">
                <router-link v-if="day"
                        :to="{name: 'day', params: {slug: day.slug}}">
                    {{ day.title.de }}
                </router-link>

                <router-link v-if="location"
                        :to="{name: 'location', params: {slug: location.main.slug}}">
                    {{ location.main.title.de }}
                </router-link>
                <span class="location-detail"
                        v-if="location && location.detail">
                    {{ location.detail }}
                </span>
            </dt>

            <dd class="tt-column-events">
                <ul>
                    <tt-event v-for="(event, index) in data.events"
                            :key="event.id"
                            :class="`push-${pushes[index]}`"
                            :event="event"
                            :time-frame="timeFrame"/>
                </ul>
            </dd>
        </dl>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import TtEvent from './ttEvent.vue'

@Component({
    components: {
        TtEvent,
    },
})
export default class TtColumn extends Vue {
    @Prop({type: Object, required: true}) data!: IYC.TTColumnData
    @Prop({type: Object, required: true}) timeFrame!: IYC.TTTimeFrame

    pushes: number[] = []
    maxPushes: number = 0

    created(){
        this.checkforOverlaps()
    }

    get location(){
        return this.data.location
    }

    get day(){
        return this.data.day
    }

    @Watch('data.events')
    checkforOverlaps(){
        const slots: IYC.Timeslot[] = this.data.events.map(({dates}) => {
            return dates[0].timeslot as IYC.Timeslot
        })
        this.pushes = []
        slots.forEach(({start}, index) => {
            const overlappingSlots: number[] = []
            for (let i = index - 1; i >= 0; i--) {
                if (slots[i].end > start) {
                    overlappingSlots.push(i)
                }
                else if (slots[i].end <= start) {
                    break
                }
            }
            if (overlappingSlots.length > 0) {
                for (let i = 0; i < 10; i++) {
                    let free = true
                    for (let j = 0; j < overlappingSlots.length; j++) {
                        const idx = overlappingSlots[j]
                        if (this.pushes[idx] === i) {
                            free = false
                            break
                        }
                    }
                    if (free) {
                        this.pushes[index] = i
                        break
                    }
                }
            }
            else {
                this.pushes[index] = 0
            }
        })
        this.maxPushes = this.pushes.reduce((acc, cur) => Math.max(acc, cur))
    }
}
</script>



<style scoped lang="sass">
$col-width: 200px
$gap-width: 10px

=pushes
    @for $i from 0 through 9
        .max-pushes-#{$i}
            width: ($i + 1) * $col-width + $i * $gap-width

        .push-#{$i}
            margin-left: $i * ($col-width + $gap-width)

+pushes

.tt-column
    flex: 1 0 auto
    min-width: $col-width
    margin: 0 0 0 2 * $gap-width

    + .tt-column
        ul::before
            position: absolute
            top: 0
            left: - $gap-width
            display: block
            content: ''
            width: 1px
            height: 100%
            background: #666

    dl
        display: flex
        flex-direction: column
        height: 100%

.tt-column-title
    height: 3rem
    text-align: left

    a
        text-decoration: underline

.location-detail
    display: block

.tt-column-events
    display: flex
    flex: 1 0 auto
    flex-direction: column
    margin: 0

    ul
        position: relative
        flex: 1 0 auto
        height: 100%
</style>
