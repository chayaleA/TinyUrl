import mongoose from "mongoose";

const targetValueSchema = new mongoose.Schema({
    name: { type: String },
    value: { type: String }
})

export default targetValueSchema;