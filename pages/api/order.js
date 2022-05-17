import connectToDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, msg: 'Method not allowed' });
    }
    
    const { products} = req.body;
    let newOrder = new Order({
        user: req.body.address.email,
        orderid:req.body.order.order_id,
        products: products,
        amount: req.body.amount,
        status: "Pending",
        address: JSON.stringify(req.body.address),
        order: JSON.stringify(req.body.order)
    })
    newOrder = await newOrder.save()
    res.status(200).json({ success: true, msg: "Order Placed Successfully" , order_id:req.body.order.order_id, payment_id:req.body.order.payment_id ,amount:req.body.amount, products});
}

export default connectToDb(handler);