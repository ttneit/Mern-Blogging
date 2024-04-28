import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config()
const app =express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.auznugq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(
    () => {console.log('MongoDB is connected');
}).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use(cookieParser());

app.listen(3001 , () => {
    console.log('Server is running on port 3001');
});

app.use('/api/user', UserRoutes);
app.use('/api/auth',authRoute);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});