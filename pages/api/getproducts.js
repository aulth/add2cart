import connectToDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const handler =async (req, res)=>{
    if(req.method !=='GET'){
        return res.status(405).json({success:false, msg:"Method not allowed"});
    }
    let products = await Product.find();
    if(products){
        res.status(200).json({success:true, products});
    }else{
        res.status(404).json({success:false, msg:"No products found"});
    }
}

export default  connectToDb(handler);