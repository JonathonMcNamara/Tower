import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{

async createComment(newComment){
    const res = await api.post(`api/comments`, newComment)
    logger.log('Creating Comment',res.data)
    AppState.comments.push(res.data)
}
async getCommentsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('Getting Event Comments', res.data)
    AppState.comments = res.data
}

async deleteComment(commentId){
    const res = await api.delete('/api/comments/'+commentId)
    logger.log('REMOVE COMMENT', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
}

}


export const commentsService = new CommentsService()