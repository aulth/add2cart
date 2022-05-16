import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    message:{
        type:String,
    },
})

mongoose.models = {}
export default mongoose.model("Contact", ContactSchema);