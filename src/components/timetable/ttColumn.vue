<template>
    <li class="tt-column">
        <h3>
            {{ location.main.title.de }}
            <span v-if="location.detail">
                {{ location.detail }}
            </span>
        </h3>

        <ul>
            <tt-event v-for="event in data.events"
                    :key="event.id"
                    :event="event"/>
        </ul>
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

    get location(){
        return this.data.location
    }
}
</script>



<style scoped lang="sass">
// not empty
</style>
