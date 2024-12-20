// import Employee from "../../../model/EmployeeSchema/employeSchema.js"
// import { hashedPassword } from "../../../utils/bcrypt.js"

// export const addEmployee=async(req,res)=>{
//     const {name,email,password,phone,department,salary}=req.body
//     const existemployee=await Employee.findOne({email})
//     if(existemployee){
//     return res.status(400).json({success:false,message:"employee alredy exist"})
//     }
//     const hashpassword=await hashedPassword(password)
//     const newEmployee= new Employee({
//      name,
//      email,
//      password:hashpassword,
//      phone,department,salary
     
//     })
//     newEmployee.save()
//     return res.status(201).json({success:true,message:"employee Registration successfully",data:newEmployee})
//  }

//  export const getEmployee=async(req,res)=>{
//     const {page=1,limit=8}=req.query
//     const skip=(page-1)*limit
//     const totalEmployes=await Employee.countDocuments()
//     const employees=await Employee.find().skip(skip).limit(parseInt(limit))
//     if(!employees.length){
//        return res.status(404).json({success:false,message:"Not found employes"})
//     }
//     return res.status(200).json({success:true,message:"Employees fetch success",data:employees,totalEmployes,page:parseInt(page),pages:Math.ceil(totalEmployes/limit)})
//  }

//  export const editEmployee=async(req,res)=>{
//     const id=req.params.id
//     const {name,email,password,phone,department,salary}=req.body
//     const editedData=await Employee.findByIdAndUpdate(
//         id,{$set:{name,email,password,phone,department,salary}}
//     )
//     if(!editedData){
//              return res.status(404).json({success:false,message:"Employee not found"})
//          }
//     console.log("hello");
//     editedData.save()
//     return res.status(200).json({success:true,message:"edited success",data:editedData})
//  }
 
//  export const deleteEmployee=async(req,res)=>{
//     const id=req.params.id;
//     const deleted=await Employee.findByIdAndDelete(id)
//     if(!deleted){
//         return res.status(404).json({success:false,message:"Employee not found"})
//     }
//     return res.status(200).json({success:true,message:`delete employee ${deleted.name}`,data:deleted})

//  }
import Employee from "../../../model/EmployeeSchema/employeSchema.js";
import Salary from "../../../model/SalarySchema/salarySchema.js";
import mongoose from "mongoose";
import { hashedPassword } from "../../../utils/bcrypt.js";
import Department from "../../../model/departmentSchema/departmentSchema.js";

export const getSalary = async (req, res) => {
  try {
    const salaryDetails = await Salary.find();

    if (!salaryDetails || !salaryDetails.length) {
      return res.status(400).json({ success: false, message: "No salary details found" });
    }

    return res.status(200).json({ success: true, message: "Salary fetch success", data: salaryDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const addSalary = async (req, res) => {
  try {
    const { amount, employeeId, payDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid employee ID" });
    }

    const existEmployee = await Employee.findById(employeeId);
    if (!existEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const employeeName = existEmployee.name;

    const details = new Salary({
      employeeId,
      payDate,
      amount,
      employeeName,
    });

    await details.save();

    return res.status(200).json({ success: true, message: "Salary added successfully", data: details });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const editSalary = async (req, res) => {
  try {
    const { employeeId, amount, payDate } = req.body;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, message: "Invalid ID(s) provided" });
    }

    const salaryDetails = await Salary.findById(id);
    if (!salaryDetails) {
      return res.status(404).json({ success: false, message: "Salary details not found" });
    }

    const existEmployee = await Employee.findById(employeeId);
    if (!existEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const edited = await Salary.findByIdAndUpdate(
      id,
      { $set: { employeeId, amount, payDate } },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Salary edited successfully", data: edited });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, department, salary } = req.body;

    const existEmployee = await Employee.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ success: false, message: "Employee already exists" });
    }

    const hashPassword = await hashedPassword(password);
    // const existDepartment=await Department.findById(department)
    // console.log(existDepartment);
    const existDepartment=await Department.findById(department)
    const departmentName=existDepartment.dept_name
    
    const newEmployee = new Employee({
      name,
      email,
      password: hashPassword,
      phone,
      department,
      dept_name:departmentName,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({ success: true, message: "Employee registered successfully", data: newEmployee });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find().skip(skip).limit(parseInt(limit));

    if (!employees.length) {
      return res.status(404).json({ success: false, message: "No employees found" });
    }

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
      totalEmployees,
      page: parseInt(page),
      pages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, phone, department, salary } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid employee ID" });
    }

    const editedData = await Employee.findByIdAndUpdate(
      id,
      { $set: { name, email, password, phone, department, salary } },
      { new: true }
    );

    if (!editedData) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({ success: true, message: "Employee edited successfully", data: editedData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid employee ID" });
    }

    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({ success: true, message: `Deleted employee ${deleted.name}`, data: deleted });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


export const blockEmployee=async(req,res)=>{
  const id=req.params.id
  // const existingEmployee=await Employee.findByIdAndUpdate(id,{$set:{isBlocked:!isBlocked}})
  const existingEmployee=await Employee.findById(id)
  if(!existingEmployee){
    return res.status(404).json({success:false,message:"employee not  exist"})
  }
  existingEmployee.isBlocked=!existingEmployee.isBlocked
  existingEmployee.save();
  return res.status(200).json({success:true,message:`${existingEmployee.isBlocked?"blocksucess":"Unblock success"}`})
}


export const getEmployeeByid=async(req,res)=>{
  const id=req.params.id
  const employee=await Employee.findById(id)
  if(!employee){
    return res.status(404).json({success:false,message:"employee not found"})
  }
  return res.status(200).json({success:true,message:"fetch success",data:employee})
}