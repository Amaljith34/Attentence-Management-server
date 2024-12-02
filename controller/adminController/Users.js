import User from "../../model/userSchema/userSchema.js"

export const getAllUsers=async(req,res)=>{
    const users=await User.find()
    if(users.length===0){
        return res.status(404).json({message:"users Not found"})
    }
    res.status(200).json({success:true,message:"fetch success",data:users})
}