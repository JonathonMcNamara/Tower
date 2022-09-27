import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService{
    async createEvent(newEvent){
        const res = await api.post('/api/events', newEvent)
        logger.log('Creating Album', res.data)
        AppState.events.unshift(res.data)
        return res.data
    }

    async getEvents(){
        const res = await api.get('/api/events')
        logger.log('Getting the Events',res.data)
        AppState.events = res.data
    }

    async getEventById(id){
        const res = await api.get('/api/events/'+id)
        logger.log('Getting this event', res.data)
        AppState.activeEvent = res.data
    }

    async cancelEvent(id){
        const event = await this.getEventById(id)
        const res = await api.delete('/api/events/'+id)
        AppState.activeEvent = res.data
    }
}



export const eventsService = new EventsService()