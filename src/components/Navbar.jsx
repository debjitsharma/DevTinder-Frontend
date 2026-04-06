import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/cartSlice';
import { useNavigate } from 'react-router-dom';

const dispatch= useDispatch();
const navigate=useNavigate();

const handleLogout= async () =>{
  try{
    await axios.post(BASE_URL+"/logout",{},{ withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
    } catch(err){
      console.log(err);
    }
    
  };

export default function Navbar() {
  const user= useSelector((store)=>store.user);
  return (
    <div><div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user && (
  <div className="flex gap-2 mx-4">
    <div><h2>{user.firstName}</h2></div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div></div>
  )
}
