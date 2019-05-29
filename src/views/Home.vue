<template>
    <div class="home">
        <div v-if="bookmarkedEvents.length > 0">
            <h1>Dein persönliches IJT Programm</h1>
            <p>Du interessierst dich für {{ bookmarkedEvents.length }} Veranstaltungen. Das sind über {{ hours }} Stunden!</p>

            <day-select @day="daySelected" />

            <time-table :data="ttData"/>

            <div v-if="permanentEvents.length > 0">
                <h2>
                    Dauerveranstaltungen
                    <small>({{ permanentEvents.length }})</small>
                </h2>
                <event-list :events="permanentEvents" />
            </div>
        </div>
        <div v-else>
            <h1>Programm des IJT 2019</h1>
            <p><strong>Eines direkt als erstes: diese Seite ist weder offiziell, noch stammt sie von der NAK oder der IJT 2019 Düsseldorf gGmbH. Daher sind Reservierungen oder andere mit einem Login auf ijt2019.org verbundene Aktionen hier nicht möglich.</strong></p>
            <p>Um es kurz zu machen, diese WebApp ist dein digitaler Begleiter auf dem Jugendtag. Du kannst durch das Programm stöbern und deinen eigenen Plan erstellen, den du dann genau hier siehst. Mehr Informationen findest du auf der <router-link to="/about">Projekt-Seite</router-link>.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import DaySelect from '@/components/DaySelect.vue'
import TimeTable from '@/components/timetable/timetable.vue'
import EventList from '@/components/EventList.vue'

import { filterByDay } from '@/lib/iyc-event-filter'
import { DAYS } from '@/constants'

@Component({
    components: {
        DaySelect,
        TimeTable,
        EventList,
    },
})
export default class Home extends Vue {
    @Getter bookmarkedEvents!: IYC.Event[]

    selectedDay: number | null = null

    get hours(){
        function reducer(acc: number, cur: number){
            return acc + cur
        }
        const slotCount = this.bookmarkedEvents.filter(({dates}) => {
            return dates[0].timeslot
        }).map(({dates}) => {
            const timeslot = dates[0].timeslot as IYC.Timeslot
            return timeslot.end - timeslot.start
        }).reduce(reducer)

        return slotCount / 4
    }

    get ttDataAll(){
        return DAYS.map((day) => {
            return {
                day,
                events: filterByDay(this.bookmarkedEvents, day),
            }
        })
    }

    get ttData(){
        if (typeof this.selectedDay === 'number') {
            return this.ttDataAll.filter(({day}) => day.id === this.selectedDay)
        }
        else {
            return this.ttDataAll
        }
    }

    get permanentEvents(){
        return this.bookmarkedEvents.filter(({dates}) => {
            return !dates[0].timeslot
        })
    }

    daySelected(day: number | null){
        this.selectedDay = day
    }
}
</script>


<style lang="sass">
$light-border: tint($color-btn-background, 10%)
$dark-border: shade($color-btn-background, 10%)

.home
    .event-nugget.bookmarked
        background: $color-btn-background !important
        border-color: $light-border $dark-border $dark-border $light-border
</style>
