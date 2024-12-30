import Leave from "../../../model/LeavesSchema/leavesSchema.js"
export const handleRequest = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
  
 
      const requestData = await Leave.findById(id);
      if (!requestData) {
        return res.status(404).json({ success: false, message: "Request does not exist" });
      }
  
      const updatedRequest = await Leave.findByIdAndUpdate(
        id,
        { $set: { status: status ? "approved" : "rejected" } },
        { new: true }
      );
  
      const message = status?"Leave request has been approved":"Leave request has been rejected";
      return res.status(200).json({ success: true, message, data: updatedRequest });
  };
  

export const getLeaves=async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const totalLeaves = await Leave.countDocuments()
    const leaves=await Leave.find()
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
