<template>
    <div class="event-occurence">
        <div class="info">
            <span class="location">
                <router-link :to="{name: 'location', params: {slug: mainLocation.slug}}">
                    {{ mainLocation.title.de }}</router-link>
                <span class="detail"
                        v-if="date.location.detail">
                    {{ date.location.detail}}
                </span>
            </span>

            <span class="event-date"
                    v-if="timeslot">
                |
                <router-link :to="{name: 'day', params: {slug: timeslot.day.slug}}">
                    {{ timeslot.day.title.de }}</router-link>
                {{ formatTime(timeslot.startTime) }} - {{ formatTime(timeslot.endTime) }}
            </span>
        </div>

        <p class="synopsis">
            {{ date.synopsis }}
        </p>

        <p class="speaker">
            {{ date.speaker }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EventDateDetail extends Vue {
    @Prop({type: Object, required: true}) event!: IYC.Event
    @Prop({type: Object, required: true}) date!: IYC.EventDate

    get mainLocation(){
        return this.date.location.main
    }

    get timeslot(){
        return this.date.timeslot
    }

    formatTime(time: any){
        return time.format('HH:mm')
    }
}
</script>


<style scoped lang="sass">
.event-occurence + .event-occurence
    margin: 40px 0 0
    padding: 40px 0 0
    border-top: 1px solid #f0f0f0


h1
    margin-bottom: 30px

.info
    margin: 0 0 1.8em

a
    text-decoration: underline
</style>
