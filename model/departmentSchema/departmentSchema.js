import mongoose, { Schema } from "mongoose";

const departmentSchema=new mongoose.Schema({
    dept_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

const Department=mongoose.model("Department",departmentSchema)
export default Department;