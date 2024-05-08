import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { createComment,getComments,likeComment,editComment,deleteComment,getAllComments } from '../controllers/commentController.js';
const router = express.Router()

router.post('/create',verifyToken,createComment);
router.get('/getcomments/:postId',getComments);
router.put('/likeComment/:commentId',verifyToken,likeComment);
router.put('/editComment/:commentId',verifyToken,editComment);
router.delete('/deleteComment/:commentId',verifyToken,deleteComment);
router.get('/getallcomments',verifyToken,getAllComments);
export default router;