import multer from "multer";
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})
let upload = multer({storage:storage});

export default (req, res)=>{
    upload.single('image')(req, res, (err)=>{
        if(err){
            res.status(400).json({success:false, msg:err})
        }
        res.status(200).json({success:true, msg:"Image uploaded successfully", path:'/images/'+req.file.originalname})
    })
}

export const config = {
    api:{
        bodyParser:false
    }
}
