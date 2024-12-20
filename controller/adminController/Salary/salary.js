import Employee from "../../../model/EmployeeSchema/employeSchema.js"
import Salary from "../../../model/SalarySchema/salarySchema.js"


export const getSalary = async (req, res) => {
  
       const salaryDetails = await Salary.find().populate('employeeId', 'name email department isBlocked');
       const existingUserSalaries = salaryDetails.filter(salary => salary.employeeId && !salary.employeeId.isBlocked);
       if (!existingUserSalaries.length) {
           return res.status(400).json({ success: false, message: "No salary details for existing users" });
       }

       return res.status(200).json({ success: true, message: "Salary fetch success", data: existingUserSalaries });
};




export const AddSalary=async(req,res)=>{
   const{amound,employeeId,payDate}=req.body
   const existEmployee=await Employee.findById(employeeId)
   if(!existEmployee){
      return res.status(404).json({success:false,message:"employee not found"})
   }
   const employeeName=existEmployee.name
   
   const details=new Salary({
       employeeId,
       payDate,
       amound,
       employeeName
   })
   details.save()
   return res.status(200).json({success:true,message:"Add employee success",data:details})
}



export const editSalary=async(req,res)=>{
   const {employeeId,amound,payDate}=req.body
   const id=req.params.id
    
   const salaryDetails=await Salary.findById(id)
   console.log(salaryDetails);
   
   if(!salaryDetails){
      return res.status(400).json({success:false,message:"salaryDetails not found"})
   }
   const existEmployee=await Employee.findById(employeeId)
   if(!existEmployee){
      return res.status(404).json({success:false,message:"employee not found"})
   }
   existEmployee.save()
   const edited=await Salary.findByIdAndUpdate(id,{$set:{employeeId,amound,payDate}},{ new: true })
   return res.status(200).json({success:true,message:"Salary Edited Success",data:edited})
}


// export const blockSalary=async(req,res)=>{
//     const id=req.params.id
//     const existSalarydetails=await Salary.findById(id)
//     if(!existSalarydetails){
//       return res.status(404).json({success:false,message:"Salary details not found"})
//     }
//     const 
// }

