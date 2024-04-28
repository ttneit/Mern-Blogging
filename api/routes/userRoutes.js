import express from 'express'
import { updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/updateUser/:userId',verifyToken,updateUser);

export default router;