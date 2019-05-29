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
</style>
