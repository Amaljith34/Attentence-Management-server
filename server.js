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

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRouter from './routes/userRoutes.js';
// import adminRouter from './routes/adminRouter.js';
// import http from 'http';
// import { Server } from 'socket.io';

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// // Initialize express app
// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", 
//     methods: ["GET", "POST"],
//   },
// });

// // MongoDB connection
// async function main() {
//   try {
//     await mongoose.connect(process.env.MONGO_CONNECTION);
//     console.log('MongoDB connection successful');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }
// main();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', userRouter);
// app.use('/api', adminRouter);

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for employee messages
//   socket.on('employee-message', (messageData) => {
//     // Broadcast the message to the admin
//     socket.broadcast.emit('admin-message', messageData);
//   });

//   // Listen for admin messages
//   socket.on('admin-message', (messageData) => {
//     // Broadcast the message to the employee
//     socket.broadcast.emit('employee-message', messageData);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRouter from './routes/userRoutes.js';
// import adminRouter from './routes/adminRouter.js';
// import http from 'http';
// import { Server } from 'socket.io';


// dotenv.config();
// const PORT = process.env.PORT || 3000;

// // Initialize express app
// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", 
//     methods: ["GET", "POST"],
//   },
// });
// // const io = new Server(server);

// // MongoDB connection
// async function main() {
//   try {
//     await mongoose.connect(process.env.MONGO_CONNECTION);
//     console.log('MongoDB connection successful');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }
// main();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', userRouter);
// app.use('/api', adminRouter);
// // app.use('/api',chatRouter)

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected:');

//   socket.on('sendMessage', (data) => {
//     io.emit('receiveMessage', data); // Broadcast to all clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
