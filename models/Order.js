import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user:{
        type: string
    },
    products: {
        type: Array
    },
    totalPrice: {
        type: Number
    },
    status :{
        type: String,
        default: "Pending"
    }
}, {
    timestamps:true
})
mongoose.models = {}
export default mongoose.model("Order", OrderSchema);