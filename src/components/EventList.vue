<template>
    <ul class="event-list">
        <li v-for="event in events"
                :key="event.id">
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
}
</script>


<style scoped lang="sass">
.event-list
    display: flex
    flex-flow: row wrap
    margin: 0 -.6em 2em

    a
        display: block
        margin: .6em
        padding: .6em
        background: #efefef
        border-radius: .3em
</style>
