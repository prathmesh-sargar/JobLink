import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const LatestJobs = () => {

 const jobs = useSelector((state)=>state.jobs.job)
   
  return (
    <>
    <h1 className="text-purple-600 font-bold text-4xl p-4">Latest jobs</h1>
    <div className="grid  grid-cols-1  md:grid-cols-3 gap-2">
        
        {
             jobs.slice(0,6).map((data ,index )=>{

            return (
              <>
              <Link to={`jobs/description/${data._id}`}>
              <div  key={index} className="">
              <div className="w-[330px]  max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              {/* Company Name */}
              <div className="flex gap-1">
             <div className="flex  mb-4">
                <img
                  src={data?.company?.logo} // Replace with your logo URL
                  alt="Company Logo"
                  className="w-[50px] h-[50px] rounded-xl"
                />
              </div>
             
               <div className="m-auto font-bold text-xl">{data.title}</div>
             
             </div>
        
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
               {data.description}
              </p>
        
              {/* Job Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Job Type:</span>
                  <span>{data.jobType}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Salary:</span>
                  <span>{data.salary} LPA</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Location:</span>
                  <span>{data.location}, India</span>
                </div>
              </div>
            </div>
              </div>
              </Link>
              </>

            )

             })
        }
    </div>
    </>
  )
}

export default LatestJobs