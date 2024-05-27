import mongoose from "mongoose";

const targetValueSchema = new mongoose.Schema({
    name: String, 
    value: String
})

export default targetValueSchema;