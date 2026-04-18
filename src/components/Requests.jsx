import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {BASE_URL} from "../utils/constants"
import { addRequests, removeRequests } from '../utils/requestSlice'
import {addConnections} from "../utils/connectionSlice";


const Requests = () => {

const requests= useSelector((store)=>store.requests);
const connections=useSelector((store)=>store.connections);
const dispatch=useDispatch();

const fetchRequests= async()=>{
    try{
const res= await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
dispatch(addRequests(res.data.data));

}catch(err){//error
    }
    }

const reviewRequest= async(status,_id)=>{
    try{
        await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeRequests(_id));

        if(status=="accepted")
        {
          const acceptedUser= requests.find((req)=>req._id===_id);
          if(acceptedUser){
            dispatch(addConnections([...(connections || []), acceptedUser.fromUserId]));
          }
        }
    }catch(err){
        //handle error
    }
};
useEffect(()=>fetchRequests(),[]);
if(!requests) return null;
if(requests.length===0)
    return <h1>No Requests Found</h1>;

  return (
    <div className="center my-10">{requests.map((request)=>{
     const { firstName, lastName,photoUrl, age, gender, about}=request.fromUserId;
     return(<div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Profile Picture" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" " + lastName} . {age} . {gender}</h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
    </div>
  </div>
</div>)
    })}</div>
  )
}

export default Requests