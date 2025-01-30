import express from 'express'
const router = express.Router();
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicationcontroller.js';
import { isAuthenticated } from '../middlewares/isAuthneticated.js';


router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get",isAuthenticated,getAppliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.post("/status/:id/update", isAuthenticated,updateStatus);

export default router;
