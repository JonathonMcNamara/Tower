import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService{
    async getById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!event){
        throw new BadRequest('Invalid Event')
        }
    return event  
    }
    async getAll() {
    const events = await dbContext.Events.find()
    return events
    }
    async create(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator', 'name picture')
    return event
    }

    async editEvent(id, eventData) {
    let event = await this.getById(id)
    if (eventData.isCanceled != true){
        throw new BadRequest('Cannot edit this')
    }
    // @ts-ignore
    if(event.creatorId.toString() != eventData.creatorId) {
        throw new Forbidden('You are not the event owner')
    }


    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate
    event.type = eventData.type || event.type

    await event.save()
    return event
    }

    async archive(eventId, userId){
        const event = await this.getById(eventId)
        // @ts-ignore
        if(event.creatorId.toString() != userId){
            throw new Forbidden('You are not allowed')
        }

        event.isCanceled = !event.isCanceled
        await event.save()
        return `event ${event.name} is cancelled`
}


}


export const eventsService = new EventsService()