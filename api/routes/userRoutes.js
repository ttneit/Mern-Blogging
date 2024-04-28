import express from 'express'
import { updateUser,deleteUser,signout } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/updateUser/:userId',verifyToken,updateUser);
router.delete('/deleteUser/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
export default router;