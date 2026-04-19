// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch } from 'react-redux';
// import { removeUser } from '../utils/cartSlice';
// import { removeConnections } from '../utils/connectionSlice';
// import { removeFeed } from '../utils/feedSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Navbar() {

// const dispatch= useDispatch();
// const navigate=useNavigate();
// const user= useSelector((store)=>store.user);
// const handleLogout= async () =>{
//   try{
//     await axios.post(BASE_URL+"/logout",{},{ withCredentials: true });
//     dispatch(removeUser());
//     dispatch(removeFeed());
//     dispatch(removeConnections());
//     navigate("/login");
//     } catch(err){
//       console.log(err);
//     }
    
//   };
//   return (
//     <div><div className="navbar bg-base-100 shadow-sm">
//   <div className="flex-1">
//     <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
//   </div>
//   {user && (
//   <div className="flex gap-2 mx-4">
//     <div><h2>{user.firstName}</h2></div>
//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS Navbar component"
//             src={user.photoUrl} />
//         </div>
//       </div>
//       <ul
//         tabIndex="-1"
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <Link to="/profile" className="justify-between">
//             Profile
//           </Link>
//         </li>
//         <Link to="/connections" className="justify-between">
//             Connections
//           </Link>
//         <li><a onClick={handleLogout}>Logout</a></li>
//       </ul>
//     </div>
//   </div>)}
// </div></div>
//   )
// }
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/cartSlice';
import { removeConnections } from '../utils/connectionSlice';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      navigate("/login");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1117] border-b border-[#30363d] px-6 py-3 flex items-center justify-between">

      {/* Logo */}
      <Link to="/feed" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-[#39d353] flex items-center justify-center text-[#0d1117] font-black text-sm font-mono">
          &lt;/&gt;
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Dev<span className="text-[#39d353]">Tinder</span>
        </span>
      </Link>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-3">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/feed" className="px-3 py-1.5 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-all">
              Feed
            </Link>
            <Link to="/connections" className="px-3 py-1.5 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-all">
              Connections
            </Link>
            <Link to="/requests" className="px-3 py-1.5 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-all">
              Requests
            </Link>
            <Link to="/profile" className="px-3 py-1.5 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-all">
              Profile
            </Link>
          </div>

          {/* Avatar + dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-[#8b949e] group-hover:text-white transition-colors hidden sm:block">
                {user.firstName}
              </span>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#30363d] group-hover:border-[#39d353] transition-all">
                <img
                  src={user.photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <ul tabIndex={-1} className="dropdown-content mt-3 w-56 bg-[#161b22] border border-[#30363d] rounded-xl shadow-xl p-1.5 z-50">
              {/* User info header */}
              <li className="px-3 py-2 border-b border-[#30363d] mb-1">
                <p className="text-white text-sm font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-[#8b949e] text-xs truncate">{user.emailId}</p>
              </li>

              <li>
                <Link to="/feed" className="flex items-center gap-2 px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-lg transition-all">
                  <span className="text-[#39d353] font-mono text-xs">//</span> Feed
                </Link>
              </li>
              <li>
                <Link to="/connections" className="flex items-center gap-2 px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-lg transition-all">
                  <span className="text-[#39d353] font-mono text-xs">//</span> Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="flex items-center gap-2 px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-lg transition-all">
                  <span className="text-[#39d353] font-mono text-xs">//</span> Requests
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white rounded-lg transition-all">
                  <span className="text-[#39d353] font-mono text-xs">//</span> Profile
                </Link>
              </li>

              <li className="border-t border-[#30363d] mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#f85149] hover:bg-[#21262d] rounded-lg transition-all text-left"
                >
                  <span className="font-mono text-xs">×</span> Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}