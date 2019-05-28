<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/img/logo.png">
        <iyc-day
                v-for="day in days"
                :key="day.id"
                :day="day"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import IycDay from '@/components/iycDay.vue'

import { DAYS } from '@/constants'

@Component({
    components: {
        IycDay,
    },
})
export default class Home extends Vue {
    days = DAYS
}
</script>
