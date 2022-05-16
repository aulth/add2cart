import Product from "../../models/Product";
import connectToDb from "../../middleware/mongoose";
const handler = async (req, res)=>{
    if(req.method !=='POST'){
        return res.status(405).json({success:false, msg:"Method not allowed"});
    }
    let {productCode, name, price, description, image, category, quantity, brand, color, size, key} = req.body;
    if(!productCode || !name || !price || !description || !image || !category || !quantity || !key){
        return res.status(400).json({success:false, msg:"Missing required fields"});
    }
    let checkProductCode = await Product.findOne({productCode});
    if(checkProductCode){
        return res.status(400).json({success:false, msg:"Product code already exists"});
    }
    price = parseFloat(price);
    quantity = parseInt(quantity);
    let product = new Product({
        productCode,
        name,
        price,
        description,
        image,
        category,
        quantity,
        brand,
        color,
        size
    })
    if(key===process.env.ADD_KEY){
        try {
            product = await product.save()
            res.status(200).json({success:true,msg:"Product added succesfully",  product})
        } catch (error) {
            console.log(error)
        }
    }else{
        return res.status(400).json({success:false, msg:"Invalid key"});
    }
}


export default connectToDb(handler);