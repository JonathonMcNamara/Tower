import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('',this.getAll)
        .get('/:id',this.getById)
        .get('/:id/tickets', this.getTicketHolders)
        .get('/:id/comments',this.getEventComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('',this.createEvent)
        .put('/:id',this.editEvent)
        .delete('/:id',this.cancelEvent)
    }
    
    
    async getAll(req,res,next){
        try {
        const events = await eventsService.getAll()
        return res.send(events)   
        } catch (error) {
        next(error)
        }
    }

    async getById(req,res,next){
        try {
        const event = await eventsService.getById(req.params.id)
        return res.send(event)
        } catch (error) {
        next(error)    
        }   
    }

    async getEventComments(req,res,next){
        try {
        const comments = await commentsService.getAll({eventId: req.params.id})
        return res.send(comments)
        } catch (error) {
        next(error)
        }
    }

    async createEvent(req,res,next){
        try {
        req.body.creatorId = req.userInfo.id
        const event = await eventsService.create(req.body)
        return res.send(event)   
        } catch (error) {
        next(error)   
        }
    }

    async editEvent(req,res,next){
        try {
        let eventData = req.body
        eventData.creatorId = req.userInfo.id
        let event = await eventsService.editEvent(req.params.id, eventData)
        return res.send(event)
        } catch (error) {
        next(error)   
        }
    }

    async cancelEvent(req,res,next){
        try {
        const event = await eventsService.archive(req.params.id, req.userInfo.id)
        return res.send(event)
        } catch (error) {
        next(error)   
        }
    }

    async getTicketHolders(req,res,next){
        try {
        let holders = await ticketsService.getByEventId(req.params.id)  
        return res.send(holders)  
        } catch (error) {
        next(error)    
        }
    }



}