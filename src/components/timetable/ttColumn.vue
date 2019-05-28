<template>
    <li class="tt-column">
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
                    <tt-event v-for="event in data.events"
                            :key="event.id"
                            :event="event"
                            :time-frame="timeFrame"/>
                </ul>
            </dd>
        </dl>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import TtEvent from './ttEvent.vue'

@Component({
    components: {
        TtEvent,
    },
})
export default class TtColumn extends Vue {
    @Prop({type: Object, required: true}) data!: IYC.TTColumnData
    @Prop({type: Object, required: true}) timeFrame!: IYC.TTTimeFrame

    get location(){
        return this.data.location
    }

    get day(){
        return this.data.day
    }
}
</script>



<style scoped lang="sass">
.tt-column
    min-width: 200px
    margin: 0 0 0 10px

    dl
        display: flex
        flex-direction: column
        height: 100%

.tt-column-title
    height: 3rem
    text-align: left

.location-detail
    display: block

.tt-column-events
    flex: 1 0 auto
    margin: 0

    ul
        position: relative
        height: 100%
</style>
