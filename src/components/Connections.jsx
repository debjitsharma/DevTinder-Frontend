import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {BASE_URL} from "../utils/constants"
import { addConnections } from "../utils/connectionSlice";


const Connections = () => {
  
 const  connections= useSelector((store)=>store.connections);
 const dispatch= useDispatch();

 const fetchConnections= async()=>{
   if(connections !== null) return;
  try{
    const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
    dispatch(addConnections(res.data.data));

  }
 catch(err){
//handle error
 } }
  useEffect(()=>fetchConnections(),[]);
 if(!connections) return null;
 if(connections.length===0)
  return <h1>No Connections Found</h1>;
    return (
    <div className="flex justify-center">{connections.map((connections)=>{
    const {_id, firstName, lastName,photoUrl, age, gender, about}=connections;
    return(
    <div key={_id} className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {firstName}{lastName}
      <div className="badge badge-secondary">{age}</div>
    </h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">{gender}</div>
    </div>
  </div>
</div>)})}</div>
  )
}

export default Connections