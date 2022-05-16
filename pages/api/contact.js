import connectToDb from "../../middleware/mongoose";
import Contact from "../../models/Contact";
import emailValidator from 'email-validator';
const handler = async(req, res)=>{
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});
    }
    const {name, email, phone, message} = req.body;
    if(!name || !email || !phone || !message){
        return res.status(400).json({success:false, msg:'Please enter all fields'});
    }
    if(!emailValidator.validate(email)){
        return res.status(400).json({success:false, msg:'Invalid email'})
    }
    let contact = new Contact({
        name,
        email,
        phone,
        message
    })
    contact = await contact.save();
    if(contact){
        return res.status(200).json({success:true, msg:'Message sent successfully'});
    }else{
        return res.status(400).json({success:false, msg:'Message not sent'});
    }
}

export default connectToDb(handler);