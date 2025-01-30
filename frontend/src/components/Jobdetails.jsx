import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Jobdetails = () => {
    // Sample job data (replace with dynamic data as needed)

    const [jobdata, setJobdata] = useState({});

    const params = useParams();
    const jobId = params.id;
    // console.log(jobId);

  const applyJobHandler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`,{withCredentials: true});
      if(res.data.success){
         toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  }



    useEffect(() => {
      const fetchJobDetails = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`,
            {
              withCredentials: true, // Include if backend uses cookies or sessions
            });
         
          setJobdata(res.data.job)
          // console.log("Jobdata:",jobdata);
        } catch (error) {
          if (error.response) {
            console.log("Server Error:", error.response.data.message);
          } else {
            console.log("Network Error:", error.message);
          }
        }
      };
      fetchJobDetails();
    }, [jobId, jobdata]);
    
    // const jobData = {
    //   title: "Frontend Developer",
    //   description:
    //     "We are looking for a skilled Frontend Developer to join our team. The candidate should have expertise in modern web development technologies such as React, CSS, and JavaScript.",
    //   requirements: [
    //     "Proficiency in React.js and modern JavaScript (ES6+)",
    //     "Experience with responsive design and cross-browser compatibility",
    //     "Knowledge of state management tools (Redux/Context API)",
    //     "Good communication and teamwork skills",
    //   ],
    //   salary: "8 - 12 LPA",
    //   experience: "2+ years",
    //   location: "Remote/Hybrid (Mumbai, India)",
    //   jobType: "Full-Time",
    //   position: "Mid-Level",
    // };
  
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Job Title */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {jobdata.title}
          </h1>
  
          {/* Job Details */}
          <div className="space-y-4">
            {/* Description */}
            <div>
              <h2 className="text-lg font-medium text-gray-700">Description</h2>
              <p className="text-gray-600 mt-2">{jobdata.description}</p>
            </div>
  
            {/* Requirements */}
            <div>
              <h2 className="text-lg font-medium text-gray-700">Requirements</h2>

              <ul className="list-disc pl-6 mt-2 text-gray-600">
                {jobdata?.requirements?.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
              
            </div>
  
            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Salary */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Salary</h2>
                <p className="text-gray-600 mt-1">{jobdata.salary} <span className="font-bold">LPA</span></p>
              </div>
  
              {/* Experience */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Experience</h2>
                <p className="text-gray-600 mt-1">{jobdata.experienceLevel}</p>
              </div>
  
              {/* Location */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Location</h2>
                <p className="text-gray-600 mt-1">{jobdata.location}</p>
              </div>
  
              {/* Job Type */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Job Type</h2>
                <p className="text-gray-600 mt-1">{jobdata.jobType}</p>
              </div>
  
              {/* Position */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Position <span className="text-sm text-slate-500"> ( number of openings )</span></h2>
                <p className="text-gray-600 mt-1">{jobdata.position}</p>
              </div>
            </div>
          </div>
  
          {/* Apply Button */}
          <div className="mt-6">
            <button
              className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={applyJobHandler}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Jobdetails;
  