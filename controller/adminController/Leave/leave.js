import Leave from "../../../model/LeavesSchema/leavesSchema.js"

export const handleRequest=async(req,res)=>{
    const id=req.params.id
    const {status}=req.body
    const requestData=await Leave.findById(id)
    if(!requestData){
        return res.status(404).json({success:false,message:"request does not exist"})
    }
    if(status){
        const ApproveRequest=await Leave.findByIdAndUpdate(id,{$set:{status:"approved"}},{new :true})
        return res.status(200).json({success:true,message:"Leave request is Approved",data:ApproveRequest})
    }
    else{
        const Rejectrequest=await Leave.findByIdAndUpdate(id,{$set:{status:"rejected"}},{new :true})
        return res.status(400).json({success:true,message:"Leave request is Rejected",data:Rejectrequest})

    }
}