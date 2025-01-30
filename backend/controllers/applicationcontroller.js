import Application from "../models/applicationmodel.js";
import Job from "../models/jobmodel.js";

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(404).json({
                message:"Jod Id not found ",
                success: false
            })
        };
        // check if the user is allready apply for the job or not 
        const existingApplication = await Application.findOne({job:jobId , applicant:userId});
        if(existingApplication){
            return res.status(401).json({
                message: "User allready applied ",
                success: false
            })
        };

        // check if job exist or not 
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "JOb not found",
                success: false
            })
        };

        // create new application 
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Job Applied Successfully.....",
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
}

// for student : 
export const getAppliedJobs = async(req,res)=>{
    try {
        const userId = req.id; 
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path:"job",    // nested populated 
            options:{sort:{createdAt: -1}},
            populate:{
                path:"company",
                options:{sort:{createdAt: -1}}
            }
        })

        if(!application){
            return res.status(404).json({
                message: "Applications not found",
                success: false
            })
        };
        return res.status(200).json({
            message: "application list ",
            application,
            success:true
        });
        
    } catch (error) {
        console.log(error);
        
    }
}

// admin dekega kitane user ne apply kiya he : 
export const  getApplicants = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt: -1}},
            populate:{
                path:"applicant",
                potions:{sort:{createdAt:-1}}
            }
        });
        if(!job){
            return res.status({
                message: "Job not found ",
                success: false
            })
        };

        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success:false
            })
        };

        const application = await Application.findOne({_id: applicationId});
        if(!application){
            return res.status(400).json({
                message: "Application not found...",
                success:false
            })
        };
        // update the status 
        application.status = status.toLowerCase();
        await application.save();


        return res.status(200).json({
            message: "Status updated Successfully...",
            success :true
        });

    } catch (error) {
        console.log(error);
        
    }
}