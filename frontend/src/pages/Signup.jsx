
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import {RotatingLines} from 'react-loader-spinner'

const Signup = () => {

  const dispatch = useDispatch();

  const loading = useSelector((state)=> state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(setLoading(true))
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("file", data?.profilePhoto[0]);

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(errors.response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while registering!");
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
     
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Signup Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full border-gray-300 rounded px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full border-gray-300 rounded px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone Number must be 10 digits",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-gray-300 rounded px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  {...register("role", { required: "Role is required" })}
                />
                <span className="ml-2">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="recruiter"
                  {...register("role", { required: "Role is required" })}
                />
                <span className="ml-2">Recruiter</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profilePhoto">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="w-full border-gray-300 rounded px-2 shadow-sm"
              {...register("profilePhoto", { required: "Profile Photo is required" })}
            />
            {errors.profilePhoto && (
              <p className="text-red-500 text-sm">{errors.profilePhoto.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
             {
              loading ? (
                <>
            <div className="flex justify-center ">
            <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}

          />
            </div>
                </>
              ): (
                <>Signup</>
              )
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
