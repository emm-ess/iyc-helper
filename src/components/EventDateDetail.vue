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

        <div class="interaction">
            <button class="iyc-button"
                    :class="{active: bookmarked}"
                    @click="bookmark">
                {{ bookmarkBtnText }}
            </button>

            <span class="reservation"
                    v-if="date.booking.required">
                <button class="iyc-button"
                        :class="{active: reserved}"
                        @click="reserve">
                    {{ reserveBtnText }}
                </button>

                <span class="full"
                        v-if="date.booking.full">
                    ausgebucht
                </span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class EventDateDetail extends Vue {
    @Prop({type: Object, required: true}) event!: IYC.Event
    @Prop({type: Object, required: true}) date!: IYC.EventDate

    @Mutation updateEvent!: any

    get mainLocation(){
        return this.date.location.main
    }

    get timeslot(){
        return this.date.timeslot
    }

    get bookmarked(){
        return this.date.booking.bookmarked || false
    }
    set bookmarked(value: boolean){
        this.date.booking.bookmarked = value
        this.updateEvent(this.event)
    }
    get bookmarkBtnText(){
        return this.bookmarked ? 'gemerkt' : 'merken'
    }

    get reserved(){
        return this.date.booking.reserved || false
    }
    set reserved(value: boolean){
        this.date.booking.reserved = value
        if (value) {
            this.bookmarked = true
        }
        this.updateEvent(this.event)
    }
    get reserveBtnText(){
        return this.reserved ? 'reserviert !' : 'reserviert ?'
    }

    formatTime(time: any){
        return time.format('HH:mm')
    }

    bookmark(){
        this.bookmarked = !this.bookmarked
    }

    reserve(){
        this.reserved = !this.reserved
    }
}
</script>


<style scoped lang="sass">
.event-occurence + .event-occurence
    margin: 50px 0 0
    padding: 50px 0 0
    border-top: 1px solid #f0f0f0


h1
    margin-bottom: 30px

.info
    margin: 0 0 1.8em

.interaction
    margin: 2.4em 0 0

.reservation
    margin-left: 20px

.full
    color: $red

a
    text-decoration: underline
</style>
