import mongoose from "mongoose";


const salarySchema=new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
    },
    employeeName:{
        type:String,
        required:true
    },
    payDate:{
        type:Date,
        default:Date.now()
     
    },
    amound:{
        type:Number,
        require:true
    }

    
})
const Salary=mongoose.model('Salary',salarySchema)
export default Salary