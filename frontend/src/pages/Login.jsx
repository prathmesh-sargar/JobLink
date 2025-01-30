
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import {RotatingLines} from 'react-loader-spinner'

const Login = () => {
 

  const loading = useSelector((state)=> state.auth.loading);
  console.log(loading);
  

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    setLoading(true)
    try {
       const response = await axios.post(
        "https://joblink-backend-1zs3.onrender.com/api/v1/user/login",
        data,
        { withCredentials: true }
      );
      // console.log("response : ",response);
      
      dispatch(setUser(response.data.user)); // Pass the user data directly
     
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        console.log(response.data.message);
        toast.error(errors.response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
     
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded  hover:bg-indigo-700"
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
                <>Login</>
              )
            }
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
