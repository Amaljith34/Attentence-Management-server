import express from 'express';
import { getAllUsers } from '../controller/adminController/Users.js';
import { trycatch } from '../middleware/tryCatch.js';
import { addDepartment, editDepartment, getDepartments } from '../controller/adminController/Department/department.js';

const router=express.Router()
router.post('/admin/users',trycatch(getAllUsers))
router.post('/admin/department',trycatch(addDepartment))
router.get('/admin/department',trycatch(getDepartments))
router.put('/admin/department/:id',trycatch(editDepartment))
export default router