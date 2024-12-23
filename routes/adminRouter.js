import express from 'express';
// import { getAllUsers } from '../controller/adminController/Employee/Users.js';
import { trycatch } from '../middleware/tryCatch.js';
import { addDepartment, deleteDepartment, editDepartment, getDepartment, getDepartments } from '../controller/adminController/Department/department.js';
import { addEmployee, blockEmployee, deleteEmployee, editEmployee, getEmployee, getEmployeeByid } from '../controller/adminController/Employee/employee.js';
import { AddSalary, editSalary, getSalary } from '../controller/adminController/Salary/salary.js';
import { totalDepartment, totalEmployee } from '../controller/adminController/Dashbord/dashBoard.js';
import { handleRequest } from '../controller/adminController/Leave/leave.js';
import { getLeaves } from '../controller/EmployeeController/Leave/leave.js';

const router=express.Router()
// router.post('/admin/users',trycatch(getAllUsers))
router.post('/admin/department',trycatch(addDepartment))
router.get('/admin/department',trycatch(getDepartments))
router.get('/admin/departments',trycatch(getDepartment))
router.put('/admin/department/:id',trycatch(editDepartment))
router.delete('/admin/department/:id',trycatch(deleteDepartment))
router.post('/admin/employee',trycatch(addEmployee))
router.get('/admin/employee',trycatch(getEmployee))
router.get('/admin/employee/:id',trycatch(getEmployeeByid))
router.patch('/admin/employee/:id',trycatch(editEmployee))
router.patch('/admin/employee/block/:id',trycatch(blockEmployee))
router.delete('/admin/employee/:id',trycatch(deleteEmployee))
router.get('/admin/salary',trycatch(getSalary))
router.post('/admin/salary',trycatch(AddSalary))
router.put('/admin/salary/:id',trycatch(editSalary))
router.get('/admin/dashboard/employee',trycatch(totalEmployee))
router.get('/admin/dashboard/department',trycatch(totalDepartment))
router.patch('/admin/leave-request/:id',trycatch(handleRequest))
router.get('/admin/leave-request',trycatch(getLeaves))
export default router