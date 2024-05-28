import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    links: [{type: mongoose.Schema.Types.ObjectId, ref: 'links'}]
})

const userModel = mongoose.model("users", userSchema);
export default userModel;