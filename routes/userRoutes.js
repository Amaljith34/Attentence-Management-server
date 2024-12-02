import express from 'express'
import { login, userRegister } from '../controller/authController/authController.js'
import { trycatch } from '../middleware/tryCatch.js'    
const router=express.Router()


router.post('/registration',trycatch(userRegister))
router.post('/login',trycatch(login))



export default router
