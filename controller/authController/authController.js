
import Userschema from '../../model/userSchema/userSchema.js'
import User from "../../model/userSchema/userSchema.js"
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js"
import { generateToken } from "../../utils/jwt.js"

export const userRegister=async(req,res)=>{
   const {name,email,password}=req.body 
   const existUser=await Userschema.findOne({email})
   if(existUser){
   return res.status(400).json({success:false,message:"User alredy exist"})
   }
   const hashpassword=await hashedPassword(password)
   const newUser= new Userschema({
    name,
    email,
    password:hashpassword,
    
   })
   newUser.save()
   return res.status(201).json({success:true,message:"user Registration successfully",data:newUser})

}

export const login=async(req,res)=>{
   const {email,password}=req.body;
   const user=await User.findOne({email})
   if(!user){
      return res.status(404).json({success:false,message:"email id not found please registration"})
   }
   const validUser=await comparePassword(password,user.password)
   if(!validUser){
      return res.status(400).json({success:false,message:"Incorrect Password"})
   }
   if(user.isBlocked){
       return res.status(401).json({success:false,message:"sorry you are blocked"})
   }
   const token=generateToken(user.id)
   return res.status(200).json({success:true,message:"successfully",data:user,token})
}

const userRegister=async()=>{
   const {email}=req.body
}
