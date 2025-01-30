import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../redux/companySlice";

const Companies = () => {
  // Mock data for companies

  const dispatch = useDispatch();

  const companies = useSelector((state)=>state.company.companies)

  useEffect(()=>{

    const getAllCompnies = async()=>{
      try {

        const res = await axios.get("http://localhost:8000/api/v1/company/get",{withCredentials: true})
        // console.log(res.data.companies);
        dispatch(getCompanies(res?.data?.companies));
        
      } catch (error) {
        console.log(error);
  
      }
    }
    getAllCompnies();
  },[dispatch])

  const [searchTerm, setSearchTerm] = useState("");


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Companies</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Link to={"/company/create"} >Add Company</Link>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Companies Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Logo</th>
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Date</th>
                <th className="border border-gray-300 p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-3">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">{company.name}</td>
                    <td className="border border-gray-300 p-3">{company.createdAt.toString().split('T')[0]}</td>
                    <td className="border border-gray-300 p-3">{company.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 p-3 text-center text-gray-500"
                  >
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Companies;
