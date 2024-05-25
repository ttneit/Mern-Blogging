import express from 'express'
import { updateUser,deleteUser,signout,getUsers,getUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/updateUser/:userId',verifyToken,updateUser);
router.delete('/deleteUser/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/getusers',verifyToken,getUsers);
router.get('/:userId',getUser);
export default router;