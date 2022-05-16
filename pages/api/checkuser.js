import connectToDb from "../../middleware/mongoose";
import emailValidater from 'email-validator';
import User from "../../models/User";

const handler =async (req, res)=>{
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});
    }
    const {email} = req.body;
    if(!email){
        return res.status(400).json({success:false, msg:'Please enter all fields'});
    }
    if(!emailValidater.validate(email)){
        return res.status(400).json({success:false, msg:'Invalid email'})
    }
    let user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({success:false, msg:'User not found'});
    }
    return res.status(200).json({success:true, msg:'User found'});
}
export default connectToDb(handler);