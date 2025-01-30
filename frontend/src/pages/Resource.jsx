import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Resource = () => {

  const jobQuery = useSelector((state)=>state.jobs.jobQuery)
  const jobs = useSelector((state)=>state.jobs.job)
  console.log(jobQuery);
  console.log(jobs);
  

  const filterData = jobs.filter((job)=> job.title.toLowerCase().includes(jobQuery))
  console.log(filterData);
  
  
  return (
    <>

     <br />
     <h1 className="font-bold p-2 text-xl">totaljobs ({filterData.length})</h1>


     <div className="grid  grid-cols-1  md:grid-cols-3 gap-3 overflow-y p-4">
   {/* <Jobs/> */}
   {
      filterData.map((data , index)=>{
        return <div key={index}>
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      
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
    
         
          <p className="text-gray-600 text-sm mb-4 ">
            {data.description}
          </p>
    

         <div className=" flex gap-4">
          
           <Link to={`/jobs/description/${data._id}`}>
           <button className="w-[100px] bg-gray-200 text-purple-700 mt-6 py-2 px-4 rounded-lg ">
            Details
          </button>
          </Link>
          <button className="w-1/2 bg-indigo-600 text-white mt-6 py-2 px-4 rounded-lg hover:bg-indigo-700">
            Apply Now
          </button>
         </div>
        </div>
        </div>
      })
   }
   
   </div>

    </>
  )
}

export default Resource