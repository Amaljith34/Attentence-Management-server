import Department from "../../../model/departmentSchema/departmentSchema.js"
import Employee from "../../../model/EmployeeSchema/employeSchema.js"

export const totalEmployee=async(req,res)=>{
   const employees=await Employee.find()
   if(!employees){
    return res.status(404).json({success:false,message:"No employee "})
   }
   const totalemployee=employees.length
   return res.status(200).json({success:true,message:"Success",data:totalemployee})
} 

export const totalDepartment=async(req,res)=>{
    const department=await Department.find()
    if(!department){
        return res.status(404).json({success:false,message:"No department "})
    }
    const totaldepartment=department.length
    return res.status(200).json({success:true,message:"Success",data:totaldepartment})   
}