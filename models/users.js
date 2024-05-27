import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    links: [{type: mongoose.Schema.Types.ObjectId, ref: 'links'}]
})

const userModel = mongoose.model("users", userSchema);
export default userModel;