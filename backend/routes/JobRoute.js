import express from 'express'
const router = express.Router();
import { getAdminJobs, getAllJob, getJobById, postJob } from '../controllers/jobcontroller.js';
import { isAuthenticated } from '../middlewares/isAuthneticated.js';

router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAllJob);
router.get("/getadminjobs",isAuthenticated,getAdminJobs);
router.get("/get/:id", isAuthenticated,getJobById);
export default router;
