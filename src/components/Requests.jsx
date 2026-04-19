// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import {BASE_URL} from "../utils/constants"
// import { addRequests, removeRequests } from '../utils/requestSlice'
// import {addConnections} from "../utils/connectionSlice";


// const Requests = () => {

// const requests= useSelector((store)=>store.requests);
// const connections=useSelector((store)=>store.connections);
// const dispatch=useDispatch();

// const fetchRequests= async()=>{
//     try{
// const res= await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
// dispatch(addRequests(res.data.data));

// }catch(err){//error
//     }
//     }

// const reviewRequest= async(status, request)=>{
//     try{
//         await axios.post(BASE_URL+"/request/review/"+status+"/"+request._id,{},{withCredentials:true});
//         dispatch(removeRequests(request._id));

//         if(status === "accepted" && request.fromUserId){
//             dispatch(addConnections([...(connections || []), request.fromUserId]));
//         }
//     }catch(err){
//         //handle error
//     }
// };
// useEffect(()=>fetchRequests(),[]);
// if(!requests) return null;
// if(requests.length===0)
//     return <h1>No Requests Found</h1>;

//   return (
//     <div className="center my-10">{requests.map((request)=>{
//      const { firstName, lastName,photoUrl, age, gender, about}=request.fromUserId;
//      return(<div key={request._id} className="card card-side bg-base-100 shadow-sm">
//   <figure>
//     <img
//       src={photoUrl}
//       alt="Profile Picture" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{firstName +" " + lastName} . {age} . {gender}</h2>
//     <p>{about}</p>
//     <div className="card-actions justify-end">
//       <button className="btn btn-primary" onClick={()=>reviewRequest("accepted", request)}>Accept</button>
//     </div>
//     <div className="card-actions justify-end">
//       <button className="btn btn-primary" onClick={()=>reviewRequest("rejected", request)}>Reject</button>
//     </div>
//   </div>
// </div>)
//     })}</div>
//   )
// }

// export default Requests

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from '../utils/requestSlice';
import { addConnections } from "../utils/connectionSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch(err) {}
  };

  const reviewRequest = async (status, request) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + request._id, {}, { withCredentials: true });
      dispatch(removeRequests(request._id));
      if (status === "accepted" && request.fromUserId) {
        dispatch(addConnections([...(connections || []), request.fromUserId]));
      }
    } catch(err) {}
  };

  useEffect(() => { fetchRequests(); }, []);

  if (!requests) return null;

  if (requests.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-xl font-semibold text-base-content/70">No pending requests</h2>
        <p className="text-sm text-base-content/40 mt-2">When someone likes you, they'll appear here</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10">

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-base-content">Requests</h1>
        <p className="text-sm text-base-content/50 mt-1">
          {requests.length} pending request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Request cards */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;
          return (
            <div
              key={request._id}
              className="bg-base-100 rounded-2xl border border-base-300 flex items-center gap-4 p-4 hover:shadow-md transition-all duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
                  alt={firstName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-base-300"
                  onError={(e) => { e.target.src = 'https://www.geographyandyou.com/images/user-profile.png'; }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base-content">
                  {firstName} {lastName}
                  {age && <span className="text-sm font-normal text-base-content/50 ml-2">{age} yrs</span>}
                  {gender && <span className="text-sm font-normal text-base-content/50"> · {gender}</span>}
                </p>
                {about && (
                  <p className="text-sm text-base-content/60 mt-0.5 truncate">{about}</p>
                )}
                {skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs bg-base-200 text-base-content/70 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {skills.length > 3 && (
                      <span className="text-xs text-base-content/40">+{skills.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  className="btn btn-sm btn-success text-white min-w-20"
                  onClick={() => reviewRequest("accepted", request)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error min-w-20"
                  onClick={() => reviewRequest("rejected", request)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;