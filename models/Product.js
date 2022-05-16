import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    productCode:{
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type:String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type:String,
    },
    quantity:{
        type:String,
    },
    brand:{
        type:String
    },
    color:{
        type :String
    },
    size:{
        type: String,
    }
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model('Product', ProductSchema);