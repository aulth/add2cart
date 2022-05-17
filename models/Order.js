import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user:{
        type: String
    },
    products: {
        type: Array
    },
    orderid:{
        type: String
    },
    amount: {
        type: Number
    },
    status :{
        type: String,
        default: "Pending"
    },
    address:{
        type: String
    },
    order: {
        type: String,
    }
}, {
    timestamps:true
})
mongoose.models = {}
export default mongoose.model("Order", OrderSchema);