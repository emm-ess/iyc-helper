export function filterByDay(events: IYC.Event[], day: IYC.Day | number){
    day = typeof day === 'number' ? day : day.id

    return events.filter((event) => {
        return event.dates.findIndex((date) => {
            return !!date.timeslot && date.timeslot.day.id === day
        }) >= 0
    })
}

export function filterByDayLocation(events: IYC.Event[], day: IYC.Day | number, location: IYC.Location | number){
    day = typeof day === 'number' ? day : day.id
    location = typeof location === 'number' ? location : location.id

    return events.map((event) => {
        const newEvent = Object.assign({}, event)
        newEvent.dates = event.dates.filter((date) => {
            const byDay = !!date.timeslot && date.timeslot.day.id === day
            const byLocation = date.location.id === location
            return byDay && byLocation
        })
        return newEvent
    }).filter(({dates}) => dates.length > 0)
}

// export function filterByLocation(events: IYC.Event[], location: IYC.Location){
//     const locationId = location.id
//     return events.filter((event) => {
//         return event.dates.findIndex((date) => {
//             return date.location.id === locationId
//         }) >= 0
//     })
// }

export function getLocations(events: IYC.Event[]){
    const locations: IYC.Location[] = []
    events.forEach((event, index) => {
        event.dates.forEach((date) => {
            if (!date) {
                console.log(index, event)
            }
            const dateLocId = date.location.id
            const locationUnique = !locations.find((location) => {
                return location.id === dateLocId
            })
            if (locationUnique) {
                locations.push(date.location)
            }
        })
    })
    return locations
}

export function splitEvents(events: IYC.Event[]){
    const allDay: IYC.Event[] = []
    const specific: IYC.Event[] = []

    events.forEach((event) => {
        if (!event.dates[0].timeslot) {
            allDay.push(event)
        }
        else {
            specific.push(event)
        }
    })

    return {allDay, specific}
}
