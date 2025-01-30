import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterjob } from "../redux/jobSlice";
const Sidebar = () => {

  const dispatch = useDispatch()

  const AllJob = useSelector((state)=>state.jobs.job)

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");

  console.log(selectedIndustry);
  console.log(selectedLocation);
  console.log(selectedSalaryRange);

  useEffect(()=>{

    const filterJobs = AllJob.filter((job)=>{
         return job.location.includes(selectedLocation)
       
    })

    dispatch(setFilterjob(filterJobs))
    console.log(filterJobs);
    
  },[AllJob, dispatch, selectedIndustry, selectedLocation])
  

  return (
    <div className="w-full md:w-64 bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Industries Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Job Role</h3>
        <div className="flex flex-col space-y-2">
          {["frontend", "backend", "full Stack", "data Science", "AIML"].map(
            (jobrole) => (
              <label key={jobrole} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="industry"
                  value={jobrole}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  checked={selectedIndustry === jobrole}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span>{jobrole}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <div className="flex flex-col space-y-2">
          {["Pune", "Mumbai", "Bangalore", "Delhi"].map((loc) => (
            <label key={loc} className="flex items-center space-x-2">
              <input
                type="radio"
                name="location"
                value={loc}
                onChange={(e) => setSelectedLocation(e.target.value)}
                checked={selectedLocation === loc}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
        <div className="flex flex-col space-y-2">
          {["0-5 LPA", "5-10 LPA", "10-15 LPA", "15+ LPA"].map((range) => (
            <label key={range} className="flex items-center space-x-2">
              <input
                type="radio"
                name="salary"
                value={range}
                onChange={(e) => setSelectedSalaryRange(e.target.value)}
                checked={selectedSalaryRange === range}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span>{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        // onClick={() =>
        //   console.log({
        //     selectedIndustry,
        //     selectedLocation,
        //     selectedSalaryRange,
        //   })
        // }
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;
