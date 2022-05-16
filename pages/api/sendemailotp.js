import nodemailer from 'nodemailer';
import emailValidator from 'email-validator';
import User from "../../models/User";
import connectToDb from '../../middleware/mongoose';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    plain : false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
const handler =async (req, res)=>{
    const {email} = req.body;
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});    
     }
    if(!emailValidator.validate(email)){
        return res.status(400).json({success:false, msg:'Invalid email'})
    }
    const otp = Math.floor(Math.random() * 100000);
    const mailOptions = {
        from: `Add2Cart <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'OTP for Add2Cart',
        html: `<h1>OTP for Add2Cart</h1>
        <p>Your OTP is ${otp}</p>`
    }
    transporter.sendMail(mailOptions).then((info)=>{
        return res.status(200).json({success: true, message: 'OTP sent successfully', otp: otp});
    })
}

export default connectToDb(handler);