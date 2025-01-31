import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const userLogout = async () => {
    try {
      const res = await axios.get("https://joblink-backend-1zs3.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("User logout successfully...");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar bg-white text-black border border-gray-200 shadow-xl px-4 py-2">
        {/* Left Section - Logo */}
        <div className="flex-1 text-2xl font-bold">
          Job<span className="text-purple-500">Link</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex gap-6 font-semibold">
          {user && user.role === "recruiter" ? (
            <>
              <Link to={"/admin/companies"}>Companies</Link>
              <Link to={"/admin/jobs"}>Jobs</Link>
            </>
          ) : (
            <>
              <Link to={"/"}>Home</Link>
              <Link to={"/resources"}>Resources</Link>
              <Link to={"/jobs"}>Jobs</Link>
            </>
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        {!user ? (
          <div className="hidden md:flex gap-2">
            <Link to={"/login"} className="px-3 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold">
              Login
            </Link>
            <Link to={"/signup"} className="px-3 py-2 bg-slate-600 hover:bg-slate-800 rounded-lg text-white font-semibold">
              Signup
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative">
              <div className="w-10 rounded-full overflow-hidden cursor-pointer">
                <img alt="User Profile" src={user.profile?.profilephoto} />
              </div>
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 p-2">
                {user?.role === "student" && (
                  <Link className="block px-4 py-2 hover:bg-gray-200" to={"/profile"}>
                    View Profile
                  </Link>
                )}
                <button className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Settings</button>
                <button className="block px-4 py-2 hover:bg-gray-200 w-full text-left" onClick={userLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-white text-black border-t border-gray-200 py-4 px-4 shadow-lg">
          {user && user.role === "recruiter" ? (
            <>
              <Link to={"/admin/companies"} className="py-2">Companies</Link>
              <Link to={"/admin/jobs"} className="py-2">Jobs</Link>
            </>
          ) : (
            <>
              <Link to={"/"} className="py-2">Home</Link>
              <Link to={"/resources"} className="py-2">Resources</Link>
              <Link to={"/jobs"} className="py-2">Jobs</Link>
            </>
          )}

          {/* Auth Buttons (Mobile) */}
          {!user ? (
            <>
              <Link to={"/login"} className="py-2 px-4 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold text-center">
                Login
              </Link>
              <Link to={"/signup"} className="py-2 px-4 bg-slate-600 hover:bg-slate-800 rounded-lg text-white font-semibold text-center mt-2">
                Signup
              </Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link className="py-2" to={"/profile"}>
                  View Profile
                </Link>
              )}
              <button className="py-2">Settings</button>
              <button className="py-2 text-red-600 font-semibold" onClick={userLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
