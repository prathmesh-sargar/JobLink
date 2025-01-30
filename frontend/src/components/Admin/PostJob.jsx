import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/authSlice";
import { RotatingLines } from "react-loader-spinner";

const PostJob = () => {
  //   const [companies, setCompanies] = useState([]); // List of companies

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.auth.loading)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const company = useSelector((state) => state.company.companies);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    dispatch(setLoading(true))
    try {
      const res = await axios.post("http://localhost:8000/api/v1/job/post",
       data,{
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        reset();
        navigate("/admin/jobs");
      } else {
        toast.error(errors.response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-semibold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Job title is required" })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Frontend Developer"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the job role..."
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            No. of Positions
          </label>
          <input
            type="number"
            {...register("position", {
              required: "Number of positions is required",
            })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.position ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Number of Positions"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Type
          </label>
          <select
            {...register("jobType", { required: "Job type is required" })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.jobType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.jobType && (
            <p className="text-red-500 text-sm">{errors.jobType.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="City, State"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Salary (in LPA)
          </label>
          <input
            type="number"
            {...register("salary", { required: "Salary is required" })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.salary ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Salary in LPA"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requirements
          </label>
          <input
            type="text"
            {...register("requirements", {
              required: "Requirements are required",
            })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.requirements ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Skills required (comma-separated)"
          />
          {errors.requirements && (
            <p className="text-red-500 text-sm">
              {errors.requirements.message}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Experience Level (in Years)
          </label>
          <input
            type="number"
            {...register("experienceLevel", {
              required: "Experience level is required",
            })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.experienceLevel ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Years of Experience"
          />
          {errors.experienceLevel && (
            <p className="text-red-500 text-sm">
              {errors.experienceLevel.message}
            </p>
          )}
        </div>

        {/* Company Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Company
          </label>
          <select
            {...register("companyId", { required: "Company is required" })}
            className={`w-full border p-2 rounded-md focus:outline-none ${
              errors.companyId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Select a Company --</option>
            {company?.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.companyId && (
            <p className="text-red-500 text-sm">{errors.companyId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
           {
              loading ? (
                <>
            <div className="flex justify-center ">
            <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={true}

          />
            </div>
                </>
              ): (
                <>Post Job </>
              )
            }
        </button>
      </form>
    </div>
  );
};

export default PostJob;
