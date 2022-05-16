import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name :{
        type: String,
    },
    email: {
        type:String,
    },
    phone:{
        type:String,
    },
    password: {
        type:String,
    },
    role: {
        type:String,
    }
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('User', UserSchema);