import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addUser } from '../utils/cartSlice'

export default function Body() {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const fetchUser= async()=>{
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
    fetchUser();
  },[]);
  return (
    <div><Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}
