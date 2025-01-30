import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "../../redux/companySlice";
import { setLoading } from "../../redux/authSlice";
import {RotatingLines} from 'react-loader-spinner'

const ResisterCompany = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.auth.loading);
  const [companyName, setCompanyName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    dispatch(setLoading(true))
    try {
      e.preventDefault();
      const data = {
        companyName: companyName
      }

      const res = await axios.post(
        "https://joblink-backend-1zs3.onrender.com/api/v1/company/register",
        data,
        { withCredentials: true }
      );
      console.log(res?.data?.company);
      dispatch(getSingleCompany(res?.data?.company))
      // Add functionality to save the company

      setCompanyName("");
      navigate(`/company/setup/${res?.data?.company?._id}`);
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <>
      <div className="m-4">
        <Link
          className="bg-purple-600 shadow-lg px-3 py-1 rounded-lg"
          to={"/admin/companies"}
        >
          back
        </Link>
      </div>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Register Company</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter company name"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
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
                <>submit</>
              )
            }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResisterCompany;
