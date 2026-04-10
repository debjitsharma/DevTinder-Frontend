import React, { useEffect } from 'react'
import UserCard from './UserCArd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice'


const Feed = () => {

  const feed=useSelector((store)=>store.feed);
  const dispatch= useDispatch();

   const getFeed= async ()=>{
    if(feed) return;
    try{
      const res= await axios.get(BASE_URL+"/feed",
        {withCredentials:true});
        dispatch(addFeed(res.data.data));
    }catch(err){
      console.error("Feed fetch error:", err?.response?.status, err?.message);
    }

   }

   useEffect(()=>{getFeed();},[]);
   if(!feed) return null;
   if(feed.length===0)
    return <h1>No more users to show</h1>;
  return (
    <div className='flex justify-center my-10'><UserCard user={feed[7]}/></div>
  )
}

export default Feed
