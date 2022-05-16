
const handler = (req, res)=>{
    if(req.method==='POST'){
        res.status(200).json({body: req.body})
    }
}
export default handler