import mongoose from 'mongoose';
import clickSchema from './clicks.js';
import targetValueSchema from './targetValue.js'

const linkSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    clicks: [clickSchema],
    targetParamName: String,
    targetValues: [targetValueSchema]
})

const linkModel = mongoose.model("links", linkSchema);
export default linkModel;