import Razorpay from 'razorpay';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
const handler = async (req, res)=>{
    if(req.method!=='POST'){
        return res.status(405).send('Method not allowed');
    }
    const razorpay = new Razorpay({
        key_id:process.env.RAZOR_KEY_ID,
        key_secret:process.env.RAZOR_KEY_SECRET
    })
    const {authtoken} = req.body;
    if(!authtoken){
        return res.status(401).json({success:false, msg:'Unauthorized, Please Login'});
    }
    const isVerify = jwt.verify(authtoken, process.env.JWT_SECRET);
    if(!isVerify){
        return res.status(401).json({success:false, msg:'Please Login with correct credentials'});
    }
    // create an order
    const payment_capture = 1;
    const amount = (req.body.amount * 100).toString();
    const currency = 'INR';
    const receipt = shortid.generate();
    const option = {
        amount:amount,
        currency:currency,
        receipt:receipt,
        payment_capture:payment_capture
    }
    try {
        const response = await razorpay.orders.create(option)
        res.status(200).json({success:true, id:response.id, amount:amount, currency:currency, receipt:receipt});
    } catch (error) {
        console.log(error);
    }
        
}

export default handler;