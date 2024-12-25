import express from 'express'
import { trycatch } from '../middleware/tryCatch.js'    
import { employeeRegister, login } from '../controller/authController/authController.js'
import { getLeaveById, leaveRequest } from '../controller/EmployeeController/Leave/leave.js'
const router=express.Router()


router.post('/registration',trycatch(employeeRegister))
router.post('/login',trycatch(login))
router.post('/employee/leave-request/:id',trycatch(leaveRequest))
router.get('/employee/leave-request/:id',trycatch(getLeaveById))




export default router
