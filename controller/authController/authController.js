import Employee from "../../model/EmployeeSchema/employeSchema.js"
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js"
import { generateToken } from "../../utils/jwt.js"

export const employeeRegister=async(req,res)=>{
   const {name,email,password}=req.body 
   const existemployee=await Employee.findOne({email})
   if(existemployee){
   return res.status(400).json({success:false,message:"employee alredy exist"})
   }
   
   const hashpassword=await hashedPassword(password)
   const newEmployee= new Employee({
    name,
    email,
    password:hashpassword,
    
   })
   newEmployee.save()
   return res.status(201).json({success:true,message:"employee Registration successfully",data:newEmployee})

}

export const login=async(req,res)=>{
   const {email,password}=req.body;
   const employee=await Employee.findOne({email})
   if(!employee){
      return res.status(404).json({success:false,message:"email id not found please registration"})
   }
   const validemployee=await comparePassword(password,employee.password)
   if(!validemployee){
      return res.status(400).json({success:false,message:"Incorrect Password"})
   }
   if(employee.isBlocked){
       return res.status(401).json({success:false,message:"sorry you are blocked"})
   }
   const token=generateToken(employee.id)
   return res.status(200).json({success:true,message:"successfully",data:employee,token})
}


export const logout=async(req,res)=>{
   
}
