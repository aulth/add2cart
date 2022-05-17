import User from "../../models/User";
import connectToDb from "../../middleware/mongoose";
import emailValidator from "email-validator";
import validatePhoneNumber from "validate-phone-number-node-js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
require('dotenv').config()
const handler = async (req, res)=>{
    const {emailorphone, password} = req.body;
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});
    }
    if(!emailorphone || !password){
        return res.status(400).json({success:false, msg:'Please enter all fields'});
    }
    if(!emailValidator.validate(emailorphone) && !validatePhoneNumber.validate(emailorphone)){
        return res.status(400).json({success:false, msg:'Invalid email or phone number'});
    }
    let user = await User.findOne({$or:[{email:emailorphone}, {phone:emailorphone}]})
    if(!user){
        return res.status(400).json({success:false, msg:'User not found'});
    }
    let isPasswordMatch = await bcryptjs.compareSync(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({success:false, msg:'Invalid password'});
    }
    let authtoken = jwt.sign({id:user._id, email:user.email, phone:user.phone}, process.env.JWT_SECRET, {expiresIn:'1d'});
    return res.status(200).json({success:true, authtoken, msg:'Logged in successfully', email:user.email, phone:user.phone, name:user.name});
}
export default connectToDb(handler)