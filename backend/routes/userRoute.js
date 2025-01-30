import express from 'express'
const router = express.Router();
import { login, logout, register, updateProfile } from '../controllers/usercontroller.js';
import { isAuthenticated } from '../middlewares/isAuthneticated.js';
import { singleUpload } from '../middlewares/multer.js';

router.post("/register",singleUpload,register);
router.post("/login",login);
router.get("/logout",logout);
router.put("/profile/update", isAuthenticated,singleUpload,updateProfile);

export default router;
