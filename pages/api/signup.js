import connectToDb from "../../middleware/mongoose";
import User from "../../models/User";
import emailValidator from 'email-validator';
import validatePhoneNumber from 'validate-phone-number-node-js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const handler = async (req, res) => {
    const { email, phone, name, password } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, msg: 'Method not allowed' });
    }
    if (!email || !phone || !name || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ success: false, msg: 'Invalid email' })
    }
    if (!validatePhoneNumber.validate(phone) && phone.length !== 10) {
        return res.status(400).json({ success: false, msg: 'Invalid phone number' })
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' })
    }
    let securePassword = await bcryptjs.hashSync(password, 10);
    let checkUser = await User.findOne({$or:[{email:email}, {phone:phone}]})
    if(checkUser){
        return res.status(400).json({success:false, msg:'User already exists'})
    }
    let user = new User({
        name: name,
        email: email,
        phone: phone,
        password: securePassword
    })
    try {
        user = await user.save();
        if (user) {
            let authtoken = jwt.sign({ id: user._id, email: user.email, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(201).json({ success: true, authtoken, msg: 'User created successfully' });
        } else {
            return res.status(500).json({ success: false, msg: 'Something went wrong' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message  ,email:user.email, phone:user.phone, name:user.name});
    }
}
export default connectToDb(handler)