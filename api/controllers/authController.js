import User from '../models/User.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async(req,res,next) =>{
    const {username,email,password} = req.body;
    if(!username || username ==='' ||!email || email ===''  || !password || password ==='' ) {
        next(errorHandler(400,'All fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })
    try {
        await newUser.save();
        res.json({message : "Signup is successful"});
    } catch (error) {
        next(error);
    }
};

export const signin = async(req,res,next) =>{
    const {email,password} = req.body;
    if(!email || email ===''  || !password || password ==='' ) {
        next(errorHandler(400,'All fields are required'));
    }
    try {
        
        const validUser = await User.findOne({email});
        if(!validUser) {
            return next(errorHandler(404,'User not found'));
        } 
        const checkPass = bcryptjs.compareSync(password,validUser.password)
        if(!checkPass){
            return next(errorHandler(404,'Invalid Password'));
        }
        const {password:pass, ...rest} = validUser._doc;
            const token = jwt.sign(
                {id:validUser._id},
                process.env.JWT_SECRET
        );
        res.status(200).cookie('access_token',token, {
            httpOnly :true
        }).json(rest);
        
    } catch (error) {
        next(error);
    }
    
};

export const google = async(req,res,next) =>{
    const {name,email,googlePhotoUrl} = req.body;
    
    try {
        const validUser = await User.findOne({email});
        if(!validUser) {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);

            const newUser = new User({
                username : name.toLowerCase().split(' ').join('') +
                Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture : googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                {id:newUser._id},
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token',token, {
                httpOnly :true
            }).json(rest);
        } else{
            const token = jwt.sign(
                {id:validUser._id},
                process.env.JWT_SECRET
            );
            const {password:pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token',token, {
                httpOnly :true
            }).json(rest);
        }
        
        
    } catch (error) {
        next(error);
    }
    
};