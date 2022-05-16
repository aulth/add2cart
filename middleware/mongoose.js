import mongoose from 'mongoose';
const connectToDb = handler => async (req, res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }
    await mongoose.connect(process.env.MONGOURI)
    return handler(req, res);
}

export default connectToDb;