import Employee from "../../../model/EmployeeSchema/employeSchema.js"
import Leave from "../../../model/LeavesSchema/leavesSchema.js"

export const leaveRequest=async(req,res)=>{
   const id=req.params.id
   const {from,to,description,leaveType}=req.body
   const existingEmployee=await Employee.findById(id)
   if(!existingEmployee){
    return res.status(404).json({success:false,message:"Employee does not found"})
   }
//    const fromDate=Date(from)
//    const toDate=Date(to)
   const newRequest=new Leave({
    employeeId:id,
    employeeName:existingEmployee.name,
    from,
    to,
    description,
    leaveType
   })
   newRequest.save()
   return res.status(200).json({success:true,message:"request send success",data:newRequest})
}

export const getLeaves=async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const totalLeaves = await Leave.countDocuments()
    const leaves=await Leave.find()
    .skip((pageNum - 1) * limitNum) 
    .limit(limitNum);
    if(!leaves || !leaves.length){
        return res.status(404).json({success:false,message:"Leave no Found"})
    }
    return res.status(200).json({success:true,message:"Leaves fetch Success",data:leaves,pagination: {
        total: totalLeaves,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalLeaves / limitNum)
    }})
}