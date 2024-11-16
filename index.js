import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const PORT=process.env.PORT || 3000
const MONGO_CONNECTION="mongodb+srv://amaljith7818:kHVsl9fIojkoXbDN@cluster0.m668m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const app=express()
app.use(cors())
app.use(express.json())


async function main() {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION ||MONGO_CONNECTION );
      console.log("MongoDB connected successful");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
  
  main();

app.listen(PORT,()=>{
    console.log('running at port 3000');
    
})