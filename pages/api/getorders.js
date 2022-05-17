import connectToDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import jwt from 'jsonwebtoken';
import User from "../../models/User";
const handler = async (req, res)=>{
    const {authtoken} = req.body;
    if(!authtoken){
        return res.status(401).json({success:false, msg:'No token provided'});
    }
    try {
        const data = jwt.verify(authtoken, process.env.JWT_SECRET);
        if(!data){
            return res.status(401).json({success:false, msg:'Invalid token'});
        }
        const orders = await Order.find({user:data.email})
        const user = await User.findOne({email:data.email})
        if(!orders){
            return res.status(400).json({success:false, msg:'No orders found'});
        }
        return res.status(200).json({success:true, orders: orders, email:user.email, phone:user.phone, name:user.name});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, msg:'Server error'});
    }
}
export default connectToDb(handler)