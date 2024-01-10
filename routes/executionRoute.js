import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { CancleExecution, MyExecution, submitCode } from '../controllers/executionController.js';

const router = express.Router()

router.route('/').post(verifyToken, submitCode);
router.route('/cancle/:id').put(CancleExecution);
router.route('/my').get(verifyToken, MyExecution);

export default router