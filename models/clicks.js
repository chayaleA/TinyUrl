import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    targetParamValue: { type: String }
})

export default clickSchema;