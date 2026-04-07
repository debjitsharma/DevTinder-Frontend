import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addUser } from '../utils/cartSlice'
import { useSelector } from 'react-redux'
export default function Body() {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const location=useLocation();
  const userData= useSelector((store)=>store.user);
  const fetchUser= async()=>{
    if(userData) return;
    try{
    const res= await axios.get(BASE_URL+ "/profile",{
      withCredentials:true});
  
  dispatch(addUser(res.data))}
  catch(err){
    if (err.response?.status===401){
      navigate("/login")
    }
  }};
  useEffect(()=>{
  if(location.pathname!=="/login"){
        fetchUser();
  }

  },[]);
  return (
    <div><Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}
