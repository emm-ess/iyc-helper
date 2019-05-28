<template>
    <li class="tt-event">
        {{ event.title }} | {{ event.dates[0].timeslot.start }} | {{ event.dates[0].timeslot.end }}
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TtEvent extends Vue {
    @Prop({type: Object, required: true}) event!: IYC.Event
}
</script>



<style scoped lang="sass">
// not empty
</style>
