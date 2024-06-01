import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.auznugq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(
    () => {console.log('MongoDB is connected');
}).catch((err) => {
    console.log(err);
})

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };
  
app.use(cors(corsOptions));
app.options('*',cors());
const __dirname =  path.resolve();
// app.use(express.json());
// app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase URL-encoded payload limit
app.use(cookieParser());
app.listen(3001 , () => {
    console.log('Server is running on port 3001');
});

app.use('/api/user', UserRoutes);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
});
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});