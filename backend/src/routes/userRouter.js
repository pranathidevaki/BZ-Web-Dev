// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getMyProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const userRouter = Router();


userRouter.get("/me", protect, getMyProfile)


export default userRouter;
