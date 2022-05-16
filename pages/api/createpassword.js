import User from "../../models/User";
import connectToDb from "../../middleware/mongoose";
import bcrypt from 'bcryptjs';
const handler = async (req, res)=>{
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});
    }
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success:false, msg:'Please enter all fields'});
    }
    let securePassword = await bcrypt.hashSync(password, 10);
    let user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({success:false, msg:'User not found'});
    }
    user.password = securePassword;
    user = await user.save();
    return res.status(200).json({success:true, msg:'Password changed successfully'});
}
export default connectToDb(handler)