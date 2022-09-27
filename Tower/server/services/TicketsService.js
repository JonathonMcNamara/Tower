import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService{
    async create(newTicket) {
        const event = await dbContext.Events.findById(newTicket.eventId)
        if( newTicket.eventId.capacity == 0){
            return 'No available seats'
        }

        const ticket = await dbContext.Tickets.create(newTicket)
        // @ts-ignore
        if(event.capacity == 0){
            throw new BadRequest('Event is full')
        }
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        // @ts-ignore
        event.capacity -=1
        // @ts-ignore
        event.save()

        return ticket
    }

    async getByEventId(eventId){
        let tickets = await dbContext.Tickets.find({eventId}).populate('profile', 'name picture')
        return tickets
    }
    async getByAccountId(accountId){
        let tickets = await dbContext.Tickets.find({accountId}).populate('event')
        return tickets
    }
    async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket){
        throw new BadRequest('ticket does not exist')
    }
    if (ticket.accountId != userId){
        throw new Forbidden('You are not the ticket holder')
    }
    const event = await dbContext.Events.findById(ticket.eventId)
    await ticket.remove()
    // @ts-ignore
    event.capacity +=1
    // @ts-ignore
    event.save()
    return 'ticket removed'
    }

}

export const ticketsService = new TicketsService()