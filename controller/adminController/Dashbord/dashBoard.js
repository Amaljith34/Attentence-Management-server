import Department from "../../../model/departmentSchema/departmentSchema.js"
import Employee from "../../../model/EmployeeSchema/employeSchema.js"
import Leave from "../../../model/LeavesSchema/leavesSchema.js"
import Salary from "../../../model/SalarySchema/salarySchema.js"

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
export const leavepending=async(req,res)=>{
    const leave=await Leave.find({status:"pending"})
    if(!leave.length){
        return res.status(404).json({success:false,message:"No leave request Pending"})
    }
    const totalPendingleave=leave.length
    return res.status(200).json({success:true,message:"success",data:totalPendingleave})
}
export const leaveRejected=async(req,res)=>{
    const leave=await Leave.find({status:"rejected"})
    if(!leave.length){
        return res.status(404).json({success:false,message:"No leave rejected"})
    }
    const totalPendingleave=leave.length
    return res.status(200).json({success:true,message:"success",data:totalPendingleave})
}
export const leaveApproved=async(req,res)=>{
    const leave=await Leave.find({status:"approved"})
    if(!leave.length){
        return res.status(404).json({success:false,message:"No leave Approved"})
    }
    const totalApproved=leave.length
    return res.status(200).json({success:true,message:"success",data:totalApproved})
}

export const totalLeave=async(req,res)=>{
    const leave=await Leave.find()
    const totalLeaveRequest=leave.length
    return res.status(200).json({success:true,message:"number of leave",data:totalLeaveRequest})
}
export const totalSalary=async (req,res)=>{
    const salary=await Salary.find()
    const salaryList=salary.map((item)=>item.amound)
    const totalAmount=salaryList.reduce((a,b)=>a+b,0)
    return res.status(200).json({success:true,message:"Total Salary",data:totalAmount})
}