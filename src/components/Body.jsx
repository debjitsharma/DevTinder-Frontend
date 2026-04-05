import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

export default function Body() {
  const dispatch= useDispatch();
  const navigate= Navigate();
  const fetchUser= async()=>{
    try{
    const res= await axios.get(BASE_URL+ "/profile",{
      withCredentials:true});
  
  dispatch(addUser(res.data))}
  catch(err){
    if (err.status===401){
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
