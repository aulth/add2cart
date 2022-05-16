import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'products'
    }
})
const upload = multer({storage:storage})
const handler = async (req, res)=>{
    if(req.method !== 'POST'){
        return res.status(400).json({success:false, msg:'Method not allowed'})
    }
    upload.single('image')(req, res, async err=>{
        if(err){
            return res.status(400).json({success:false, msg:err.message})
        }
        return res.status(200).json({success:true, msg:'Image uploaded successfully', path:req.file.path})
    })
}
export default handler

export const config = {
    api:{
        bodyParser:false
    }
}