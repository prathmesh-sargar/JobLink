import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getadminjob } from "../../redux/jobSlice.js";
import { Link } from "react-router-dom";

const AdminJobs = () => {


    const dispatch = useDispatch();
    const adminjob = useSelector((state)=>state.jobs.adminjob);




    useEffect(()=>{

        const getAllAdminJobs = async()=>{

            try {
                const res = await axios.get("http://localhost:8000/api/v1/job/getadminjobs",{withCredentials: true});
                // console.log(res.data.jobs);
                dispatch(getadminjob(res.data.jobs));
            } catch (error) {
                console.log(error);   
            }
        }
        getAllAdminJobs()

    },[dispatch])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Job Table</h2>
          <Link to={"/admin/postjob"}><button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Add Job
          </button></Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-4 py-2 border">Company Name</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminjob.map((job) => (
                <tr key={job._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{job?.company?.name}</td>
                  <td className="px-4 py-2 border">{job.title}</td>
                  <td className="px-4 py-2 border">{job?.updatedAt.toString().split('T')[0]}</td>
                  <td className="px-4 py-2 border">
                   <Link to={`/admin/job/${job?._id}/applicants`}><button className="text-blue-600 hover:text-blue-800 mr-4">
                      Applicants
                    </button></Link>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
