import axios from "axios";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setApplicants } from "../../redux/applicants";
import toast from "react-hot-toast";

const Applicants = () => {



    const HandleStatus = async(status,applicantID)=>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/application/status/${applicantID}/update`,{status: status},{withCredentials: true})
            if(res.data.success){
                toast.success(res.data.message)
            }
            
        } catch (error) {
            toast.error(error.respnse.data.message);
            console.log(error);
            
        }       
    };


    

    const applications = useSelector((state)=> state.applications.applicants)


    const dispatch = useDispatch();
    const params = useParams();
    const JobId = params.id;

    // console.log( "JOb ID : ",JobId);
    

    useEffect(()=>{
        const  getAllApplicants = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/application/${JobId}/applicants`,
                {withCredentials: true});
                if(res.data.success){
                    // console.log(res.data.job.applications[0].applicant.fullname);
                    console.log(res.data.job.aaplications);
                    dispatch(setApplicants(res.data.job.applications));
                }
                
            
            } catch (error) {
                console.log(error);
                
            }
        }

        getAllApplicants()

    },[JobId, dispatch])





  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Full Name</th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Resume</th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {
                applications.length <=0 ? (
                  
                  <tr className="text-center">
                    <td>No one is applied for this job yet....</td>
                  </tr>
                   
                ):(
                    applications.map((user,index) => (  
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user?.applicant?.fullname}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user?.applicant?.email}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user?.applicant?.phoneNumber}</td>
                          <td className="px-6 py-4 border-b text-sm text-blue-500 underline">
                          {
                            user?.applicant?.profile.resume ?  <a href={`${user?.applicant?.profile?.resume}`} target="_blank" rel="noopener noreferrer">
                            {user?.applicant?.profile?.resumeOriginalName}
                          </a> : <span>NA</span>
                          }

                          </td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user?.applicant?.updatedAt.toString().split('T')[0]}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            <select 
                              onChange={(e)=>  HandleStatus(e.target.value,user?._id)}
                              defaultValue={"pending"}  
                              className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </td>
                        </tr>
                )
            
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;



