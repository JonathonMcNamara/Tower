import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
    accountId: {type: ObjectId, required: true, ref: 'Account'},
    eventId: {type: ObjectId, required: true, ref: 'Event'},
    body: {type: String, required: true},
    // isAttending: {type: Boolean} NOTE Stretch Goal
},
{ timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('event',{
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
})

CommentSchema.virtual('creator',{
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})