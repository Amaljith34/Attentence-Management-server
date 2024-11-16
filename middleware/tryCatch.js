import { errorHandle } from "./erorHandle"

export const trycatch=(controller)=>{
    return async(req,res,next)=>{
        try {
            await controller(req,res,next)
        } catch (error) {
            return errorHandle
        }
    }
}