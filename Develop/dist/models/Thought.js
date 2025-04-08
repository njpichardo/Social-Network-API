import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';
import { dateFormat } from '../utils/dateFormat.js';
// Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Create a virtual property 'reactionCount' that gets the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
