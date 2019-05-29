<template>
    <div class="detail">
        <h1>{{ event.title }}</h1>

        <p v-if="!single"
                class="notice-multiple">
            Diese Veranstaltung findet mehrmals statt:
        </p>

        <event-date-detail
                v-for="date in event.dates"
                :key="date.id"
                :event="event"
                :date="date" />

        <div class="disclaimer">
            <p>Denke bitte daran, dass eine Markierung als reserviert in dieser WebApp keine Reservierung im System des IJT darstellt. Die Markierung dient nur dazu, damit du es dir hier merken kannst.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import EventDateDetail from '@/components/EventDateDetail.vue'

@Component({
    components: {
        EventDateDetail,
    },
})
export default class Detail extends Vue {
    @Prop({type: Number, required: true}) id!: any
    @Getter getEventById!: any

    event: IYC.Event | null = null

    created(){
        if (!this.setEvent(this.id)) {
            this.$router.replace('/')
        }
    }

    beforeRouteUpdate(to: any, from: any, next: any){
        if (this.setEvent(to.params.id)) {
            next()
        }
        else {
            next('/')
        }
    }

    setEvent(id: number){
        const event = this.getEventById(id)
        if (event) {
            this.event = event
        }
        return !!event
    }

    get single(){
        return this.event && this.event.dates.length === 1
    }

    get singleDate(){
        return this.event ? this.event.dates[0] : null
    }
}
</script>


<style lang="sass" scoped>
.notice-multiple
    margin: 40px 0
    font-weight: $font-weight-bold

.disclaimer
    margin: 60px 0 0
    @extend %font-small-1

</style>
