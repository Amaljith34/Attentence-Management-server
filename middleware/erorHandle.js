export const errorHandle=(req,err)=>{
    res.status(500).json({sucess:false,message:err.message})
}