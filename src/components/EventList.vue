<template>
    <ul class="event-list">
        <li class="event-nugget"
                v-for="event in events"
                :key="event.id"
                :class="getClasses(event)">
            <router-link :to="{name: 'detail', params: {id: event.id}}">
                {{ event.title }}
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EventList extends Vue {
    @Prop({type: Array, required: true}) events!: IYC.Event[]

    getClasses(event: IYC.Event){
        const clazzes: any = Object.assign({}, event.dates[0].booking)

        event.dates.forEach(({ booking }) => {
            clazzes.full = clazzes.full && booking.full
            clazzes.reserverd = clazzes.reserved || booking.reserved
            clazzes.bookmarked = clazzes.bookmarked || booking.bookmarked
        })

        return clazzes
    }
}
</script>


<style scoped lang="sass">
.event-list
    display: flex
    flex-flow: row wrap
    margin: 0 -.6em 2em

    .event-nugget
        margin: .6em
        padding: .6em
        overflow: hidden
        border-radius: .3em

        &.required
            &::before
                top: 0
                left: 0
                height: 100%
</style>
