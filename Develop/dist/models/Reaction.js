import { Schema, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
// Reaction schema (will be used as a subdocument in Thought model)
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
export default reactionSchema;
