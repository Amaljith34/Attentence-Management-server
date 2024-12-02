import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRouter.js'
dotenv.config()
const PORT=process.env.PORT
const app=express()


async function main(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log('mongodb connection successfully');
        
    } catch (error) {
        console.log(error );
        process.exit(1);
    }
}
main()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',userRouter)
app.use('/api',adminRouter)


app.listen(PORT,()=>{
    console.log(`server Running port ${PORT}`);
    
})