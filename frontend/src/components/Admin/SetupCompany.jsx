import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SetupCompany = () => {

  const navigate = useNavigate();

  const params = useParams();

 const  companyId = params.id;
 console.log(companyId);
 
  const singleCompany = useSelector((state)=>state.company.singleCompany);

  console.log("singlecom : ",singleCompany.name);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

//   const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("website", data.website);
      formData.append("description", data.description);
      formData.append("file", data?.logo[0]);


      console.log("formdata", formData);
      

      const response = await axios.put(
        `http://localhost:8000/api/v1/company/update/${companyId}`,
        formData,
        {withCredentials : true},
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        navigate("/admin/companies");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while registering the company!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Your Company</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Company Name
            </label>
            <input
              type="text"
              defaultValue={singleCompany.name}
              id="name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("name", { required: "Company Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="website">
              Website
            </label>
            <input
              type="url"
              id="website"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("website", { required: "Website is required" })}
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("description", { required: "Description is required" })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Logo */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="logo">
              Company Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              {...register("logo", { required: "Company Logo is required" })}
            />
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupCompany;
