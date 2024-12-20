import mongoose from "mongoose";

const leaveSchema=new mongoose.Schema({
        employeeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Employee",
        },
        employeeName:{
            type:String,
            required:true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        leaveType:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum: ["pending", "approved", "rejected"],
            default:"pending"
        }

})

const Leave=mongoose.model("Leave",leaveSchema)
export default Leave