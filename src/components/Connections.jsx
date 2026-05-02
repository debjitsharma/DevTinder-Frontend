// import { useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import {BASE_URL} from "../utils/constants"
// import { addConnections } from "../utils/connectionSlice";


// const Connections = () => {
  
//  const  connections= useSelector((store)=>store.connections);
//  const dispatch= useDispatch();

//  const fetchConnections= async()=>{
//    if(connections !== null) return;
//   try{
//     const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
//     dispatch(addConnections(res.data.data));

//   }
//  catch(err){
// //handle error
//  } }
//   useEffect(()=>fetchConnections(),[]);
//  if(!connections) return null;
//  if(connections.length===0)
//   return <h1>No Connections Found</h1>;
//     return (
//     <div className="flex justify-center">{connections.map((connections)=>{
//     const {_id, firstName, lastName,photoUrl, age, gender, about}=connections;
//     return(
//     <div key={_id} className="card bg-base-100 w-96 shadow-sm">
//   <figure>
//     <img
//       src={photoUrl}
//       alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">
//       {firstName}{lastName}
//       <div className="badge badge-secondary">{age}</div>
//     </h2>
//     <p>{about}</p>
//     <div className="card-actions justify-end">
//       <div className="badge badge-outline">{gender}</div>
//     </div>
//   </div>
// </div>)})}</div>
//   )
// }

// export default Connections

import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections !== null) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch(err) {
      // handle error
    }
  };

  useEffect(() => { fetchConnections(); }, []);

  if (!connections) return null;

  if (connections.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-xl font-semibold text-base-content/70">No connections yet</h2>
        <p className="text-sm text-base-content/40 mt-2">Start swiping to make connections</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-base-content">My Connections</h1>
        <p className="text-sm text-base-content/50 mt-1">{connections.length} developer{connections.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
          return (
            <div
              key={_id}
              className="group relative bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden bg-base-300">
                <img
                  src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
                  alt={firstName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://www.geographyandyou.com/images/user-profile.png'; }}
                />

                {/* Hover overlay with about */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-xs leading-relaxed line-clamp-4">{about || 'No bio yet'}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-semibold text-sm text-base-content truncate">
                  {firstName} {lastName}
                </p>
                <p className="text-xs text-base-content/50 mt-0.5">
                  {age && `${age} yrs`}{age && gender && ' · '}{gender}
                </p>

                {/* Skills */}
                {skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {skills.slice(0, 2).map((skill, i) => (
                      <span key={i} className="text-xs bg-base-200 text-base-content/70 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {skills.length > 2 && (
                      <span className="text-xs text-base-content/40">+{skills.length - 2}</span>
                    )}
                  </div>
                )}
             <Link to={`/chat/${_id}`}><button className="btn-primary">Chat</button></Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;