import jwt from 'jsonwebtoken';

const fetchuser = async (req, res, next)=>{
    // const authtoken = req.header('authtoken');
    const authtoken = req.body.authtoken
    if(!authtoken){
        return res.status(401).json({success:false, msg:'No token provided'});
    }
    try {
        const data = jwt.verify(authtoken, process.env.JWT_SECRET);
        if(!data){
            return res.status(401).json({success:false, msg:'Invalid token'});
        }
        req.user = data
        next();
    } catch (error) {
        return res.status(500).json({success:false, msg:'Server error'});
    }
}


export default fetchuser;