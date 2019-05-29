<template>
    <div class="input-field type-select">
        <label for="day-select">
            Angezeigter Tag
        </label>

        <select id="day-select" name="day-select"
                v-model="selectedDay">
            <option v-for="item in items"
                    :key="item.title.de"
                    :value="item.id">
                {{ item.title.de }}
            </option>
        </select>
    </div>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { getItem, saveItem } from '@/io/storage'

import { DAYS } from '@/constants'

@Component
export default class DaySelect extends Vue {
    get items(){
        return [{id: null, title: {de: 'alle'}}, ...DAYS]
    }

    get selectedDay(){
        return getItem('home_day')
    }

    set selectedDay(value){
        saveItem('home_day', value)
        this.$emit('day', value)
    }

    created(){
        this.$emit('day', this.selectedDay)
    }
}
</script>


<style lang="sass" scoped>
.input-field.type-select
    max-width: 400px
    // as presented here: https://www.filamentgroup.com/lab/select-css.html
    select
        display: block
        width: 100%
        max-width: 100%
        height: 40px
        margin: 0
        padding: 0 44px 0 16px
        color: $white
        background-color: $color-text
        background-image: url('../assets/img/select-arrow.svg')
        background-repeat: no-repeat
        background-position: right 16px top 50%
        background-size: auto 9px
        border: 0
        border-radius: 0
        //avoid iOS Zoom
        font-size: 16px
        appearance: none

        &::-ms-expand
            display: none

        option
            color: $black
            background: $white
</style>
