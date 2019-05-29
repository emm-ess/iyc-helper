// const MASTER_ITEM_KEY = 'IYC_ITEMS'
// const keys: string[] = retrieve(MASTER_ITEM_KEY) || []
import {
    serialize,
    deserialize,
} from './iyc-event-converter'

const MAIN_ITEM_KEY = 'iyc_item_'
const MASTER_ITEM_KEY = 'IYC_ITEMS'
const items: string[] = retrieve(MASTER_ITEM_KEY) || []

const MAIN_EVENT_KEY = 'iyc_event_'
const MASTER_EVENT_KEY = 'IYC_EVENTS'
const events: number[] = retrieve(MASTER_EVENT_KEY) || []

export function getItem(key: string){
    return retrieve(MAIN_ITEM_KEY + key)
}

export function saveItem(key: string, value: any){
    save(MAIN_ITEM_KEY + key, value)

    if (!items.includes(key)) {
        items.push(key)
        save(MASTER_ITEM_KEY, events)
    }
}



export function getEvent(id: number){
    return deserialize(retrieve(MAIN_EVENT_KEY + id))
}

export function getAllEvents(){
    return events.map(getEvent)
}

export function saveEvent(event: IYC.Event){
    const id = event.id
    save(MAIN_EVENT_KEY + id, serialize(event))

    if (!events.includes(id)) {
        events.push(id)
        save(MASTER_EVENT_KEY, events)
    }
}

export function removeEvent(id: number){
    localStorage.removeItem(MAIN_EVENT_KEY + id)
}

function save(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
}

function retrieve(key: string){
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}
