import connectToDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res)=>{
    if(req.method!=='POST'){
        return res.status(405).json({success:false, msg:'Method not allowed'});
    }
    const {cart} = req.body;
    try {
        let productCode = []
    for (let key in cart){
        productCode.push(cart[key].productCode)
    }
    if(!cart){
        return res.status(400).json({success:false, msg:'No Product found in cart', amount:0});
    }
    let product= await Product.find({productCode: {$in:productCode} })
    let amount = 0
    for(let key in cart){
        let ProductCode = cart[key].productCode
        let newProduct = product.find(product=>product.productCode===ProductCode)
        if(newProduct){
            amount = amount + (newProduct.price * cart[key].quantity)
        }
    }
    return res.status(200).json({success:true, amount:amount});
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb(handler);