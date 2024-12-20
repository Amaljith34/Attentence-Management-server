import mongoose from 'mongoose'
const employeeSchema= new mongoose.Schema({
    
    name:{type:String,required:true},
    email:{type:String,require:true,unique:true},
    password: {type: String,required: true, },
    role:{type:String,required:true,default:"user"},
    // profileImage:{type:String},
    createAt:{type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()},
    isBlocked:{type:Boolean,default:false},
    salary:{type:String,required:true},
    phone:{type:String,required:true},
    joinDate:{type:Date,default:Date.now()},
    department:{type:mongoose.Schema.Types.ObjectId,ref:"Department"},
    dept_name:{type:String}

})

const Employee=mongoose.model("Employee",employeeSchema)
export default Employee