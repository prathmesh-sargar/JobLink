import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("User logout successfully...", res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar bg-white text-black  border border-gray-200  shadow-xl ">
        <div className="flex-1 text-2xl font-bold">
          
        Job
            <span className=" text-2xl font-bold text-purple-500">Link</span>
          
        </div>
        <div className="gap-6 flex md:mr-[35%] px-2 font-semibold">
          {user && user.role === "recruiter" ? (
            <>
            <div>
                <Link to={"/admin/companies"}>companies</Link>
              </div>
              
              <div>
                <Link to={"/admin/jobs"}>Jobs</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to={"/"}>Home</Link>
              </div>
              <div>
              <div>
                <Link to={"/resources"}>Resource</Link>
              </div>
              </div>
              <div>
                <Link to={"/jobs"}>Jobs</Link>
              </div>
            </>
          )}
        </div>
        {!user ? (
          <div className="gap-2">
            <button className="px-3 py-2 bg-purple-600 hover:bg-purple-800  rounded-lg text-white font-semibold">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="px-3 py-2 bg-slate-600 hover:bg-slate-800  rounded-lg text-white font-semibold">
              <Link to={"/signup"}>Signup</Link>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.profile?.profilephoto}
                      // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {
                    user?.role === 'student' && (
                      <li>
                      <Link className="text-underline" to={`/profile`}>
                       view  Profile
                      </Link>
                    </li>
                    )
                  }
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <span onClick={userLogout}>logout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
