import Job from "../models/jobmodel.js";


// admin post karega jobs 
export const postJob = async (req, res) => {

  try {
    const {
      title,
      description,
      position,
      jobType,
      location,
      salary,
      requirements,
      experienceLevel,
      companyId
    } = req.body;

    const userId = req.id;

    if (
      !title || !description || !position || !jobType ||  !location ||  !salary || !requirements || !experienceLevel ||!companyId 
    ) {
      return res.status(404).json({
        message: "Something is missing .....",
        success: false,
      });
    }

    const job = await Job.create({
      title : title,
      description : description,
      position : position,
      jobType :jobType,
      location :location,
      salary : Number(salary),
      requirements : requirements.split(","),
      experienceLevel,
      company: companyId,
      create_by : userId
    });
    // await job.save();
    return res.status(200).json({
        message: "New Job created Successfully.....",
        job,
        success: true
    })

  } catch (error) {
     console.log(error);
  }
};

// student : - 
export  const getAllJob = async(req,res)=>{
    try {
          const keyword = req.query.keyword || "";
          const query ={
            $or: [
                {title:{$regex: keyword,$options : "i"}},
                {description:{$regex: keyword,$options : "i"}},
            ]
          };
        const jobs = await Job.find(query).populate({
          path:'company'
        }).sort({createdAt: -1})

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found....",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success : true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // ID comes from URL
    const job = await Job.findById(jobId); // Fetch the job by ID

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job, // Return the job details
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


// admin kitane jobs create karahe :- 
export const getAdminJobs = async(req,res)=>{
    try {
         const AdminId = req.id;
         const jobs = await Job.find({create_by: AdminId}).populate({
          path:'company'
         });
         if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
         };

         return res.status(200).json({
            jobs,
            success: true
         });
         
    } catch (error) {
        console.log(error);
        
    };
};
