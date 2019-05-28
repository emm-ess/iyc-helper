<template>
    <div class="detail">
        <h1>{{ event.title }}</h1>

        <p v-if="!single"
                class="notice-multiple">
            Diese Veranstaltung findet mehrmals statt.
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
    event!: IYC.Event

    created(){
        this.event = this.getEventById(this.id)
    }

    get single(){
        return this.event.dates.length === 1
    }

    get singleDate(){
        return this.event.dates[0]
    }
}
</script>
