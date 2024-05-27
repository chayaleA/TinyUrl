import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    insertedAt: Date,
    ipAddress: String, 
    targetParamValue: String
})

export default clickSchema;