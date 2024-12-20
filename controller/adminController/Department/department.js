import Department from "../../../model/departmentSchema/departmentSchema.js"

export const addDepartment=async(req,res)=>{
    const {dept_name,description}=req.body
    const existingDept=await Department.findOne({dept_name})
    console.log(existingDept);
    
    if(existingDept){
        return res.status(400).json({success:false,message:"Department alredy exist"})
    }
    const newDept=await new Department({
        dept_name,description
    })
    await newDept.save()
    return res.status(200).json({success:true,message:"Successfully added department",data:newDept})
}

export const getDepartments=async(req,res)=>{
    const {page=1,limit=8}=req.query;
    const skip=(page-1)* limit
    const totalDepartment=await Department.countDocuments()
    const datas=await  Department.find().skip(skip).limit(parseInt(limit))
    
    if(datas.length===0){
       return res.status(404).json({success:false,message:"Department Not Found"})
    }
    
    return res.status(200).json({success:true,message:"Successfully fetch departments",data:datas,total:totalDepartment,page:parseInt(page),pages:Math.ceil(totalDepartment/limit)})
}

export const editDepartment=async(req,res)=>{
    const id=req.params.id
    const {dept_name,description}=req.body
    const existingDept=await Department.find({id})
    if(!existingDept){
        return res.status(404).json({success:false,message:"Department not exist"})
    }
    const editDept=await Department.findByIdAndUpdate({_id:id},{$set:{dept_name,description}})
    return res.status(200).json({success:true,message:"edit successfully",data:editDept})
}
// export const deleteDepartment=async(req,res)=>{
//     const id=req.params.id
//     console.log(id);
    
//     const existingDepartment=await Department.findById(id)
//     console.log(existingDepartment);
//     const deletedData=await Department.findByIdAndUpdate(
//         id,{isDelete:!existingDepartment.isDelete},{new:true}
//     )
//     console.log(deletedData);
//     res.status(200).json({success:true,message:"department deletesuccess",data:deletedData})
    
    
// }

export const deleteDepartment=async(req,res)=>{
    const id=req.params.id
    const deletedData=await Department.findByIdAndDelete(id )
    if(!deletedData){
        return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(200).json({success:true,message:"department deletesuccess",data:deletedData})
    
}

export const getDepartment=async(req,res)=>{
    const datas=await  Department.find()
    if(datas.length===0){
       return res.status(404).json({success:false,message:"Department Not Found"})
    }
    return res.status(200).json({success:true,message:"Successfully fetch departments",data:datas})
}