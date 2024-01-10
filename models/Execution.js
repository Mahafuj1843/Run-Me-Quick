import mongoose from 'mongoose';

const executionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Queued',
        enum: ['Queued', "Executing", "Complete", "canceled"]
    },
    result: {
        type: String
    },
    action:{
        type: String,
        default: "ongo",
        enum: ["ongo", "resubmit", "cancel"]
    },
    submitBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true, versionKey: false });

export default mongoose.model('Execution', executionSchema);
