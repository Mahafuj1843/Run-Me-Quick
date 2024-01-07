import express from 'express';
import { register, login, logout, updateProfile, profileDetails } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profileDetails').get(verifyToken, profileDetails);
router.route('/updateProfile').put(verifyToken, updateProfile);

export default router