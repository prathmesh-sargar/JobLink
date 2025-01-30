import {useState } from "react";
import { useDispatch } from "react-redux";
import { setJobQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [query , setQuery]  = useState(''); 
  console.log(query);

  dispatch(setJobQuery(query))

  const handleJobSearch = ()=>{
     navigate("/resources");
  }
  
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Search Apply & <br /> Get You <span className="text-orange-400">Dream Job </span></h1>
            <p className="mb-5 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="">
            <input onChange={(e)=>{setQuery(e.target.value.toLowerCase())}} type="text" placeholder="Search your Dream job ... " className="pl-2 py-1 outline-none border-none border shadow-xl border-gray-200  rounded-xl w-[75%] text-black" />
            <button onClick={handleJobSearch} className="bg-purple-600 px-3 py-1 rounded-xl hover:bg-purple-800 ml-2" >search</button>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
