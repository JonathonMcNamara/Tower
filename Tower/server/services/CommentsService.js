import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CommentsService{
    async deleteComment(eventId, userId) {
    const comment = await dbContext.Comments.findById(eventId)
    if (!comment){
        throw new BadRequest('Invalid Comment')
    }
    if (comment.accountId != userId){
        throw new Forbidden('Unable to delete comment')
    }
    await comment.remove()
    return 'comment deleted'
    }

    async createComment(newComment){
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name picture')
        await comment.populate('event')
        return comment
    }

    async getAll(query ={}){
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comments  
    }
}


export const commentsService = new CommentsService()