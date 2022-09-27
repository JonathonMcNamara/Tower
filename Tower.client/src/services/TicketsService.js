import { advancePositionWithClone } from "@vue/compiler-core"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService{
    async create(newTicket){
    const res = await api.post('/api/tickets', newTicket)
    logger.log('Creating Ticket', res.data)
    AppState.ticketHolders.push(res.data)
    }

    async getTicketHoldersByEvent(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('Getting event ticket profiles',res.data)
    AppState.ticketHolders = res.data
    }

    async getEventsByTickets(){
    const res = await api.get('/account/tickets')
    logger.log('Getting Account Tickets', res.data)
    AppState.accountTickets = res.data
    }

    async removeTicket(ticketId){
    const res = await api.delete('api/tickets/'+ticketId)
    AppState.accountTickets = AppState.accountTickets.filter(t => t.id != ticketId)
    }
}


export const ticketsService = new TicketsService()