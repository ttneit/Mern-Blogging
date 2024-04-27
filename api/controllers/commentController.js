import Comment from '../models/Comment.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const createComment =async(req,res) =>{
    const {userId,postId,content} = req.body();
    const user = User.findOne({userId});
    if (!user ){
        next(errorHandler(404,'User not found'));
    }
    if (!postId ){
        next(errorHandler(404,'Post not found'));
    }
    if (!content || content === '') {
        next(errorHandler(404,'The comment should have content'));
    }
    const newComment = new Comment({
        userId,
        postId,
        content
    })
    try {
        await newComment.save();
        res.json({message : "Successfully comment on the post"});
    } catch (error) {
        next(error);
    }

}   
export const deleteComment = async (req,res) =>{
    const user = await User.findOne(req.params.userId)
    const post = await User.findOne(req.params.postId)
    if (!user ){
        next(errorHandler(404,'User not found'));
    }
    if(user._id)
    if (!postId ){
        next(errorHandler(404,'Post not found'));
    }
    if (!content || content === '') {
        next(errorHandler(404,'The comment should have content'));
    } 

}   