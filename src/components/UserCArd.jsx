import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import {motion,usemotionValue,useTransform} from "framer-motion";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch= useDispatch();

  // ── swipe motion values ──
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleSendRequest= async(status,userId)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      dispatch(removeUserFromFeed(userId));
    }catch(err){
  //handle erroe
 }
  };

    const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handleSendRequest("interested", _id); // ← swiped right = like
    } else if (info.offset.x < -100) {
      handleSendRequest("ignored", _id);    // ← swiped left = ignore
    }
  };

  return (
     <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-100 rounded-3xl overflow-hidden shadow-2xl bg-white select-none cursor-grab active:cursor-grabbing"
    >

      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-6 z-10 border-4 border-green-400 text-green-400 text-3xl font-bold px-4 py-1 rounded-lg -rotate-12"
      >
        LIKE
      </motion.div>

       <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-6 z-10 border-4 border-red-400 text-red-400 text-3xl font-bold px-4 py-1 rounded-lg rotate-12"
      >
        NOPE
      </motion.div>


      {/* Photo */}
      <div className="relative h-150 bg-gray-200">
        <img
          src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
          alt={firstName}
          className="w-full h-full object-cover"  // ← fills the container
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Name + info — real data, not placeholders */}
        <div className="absolute bottom-16 left-5 right-5 space-y-1">
          <h2 className="text-white text-xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-white/80 text-sm">
            {age && `${age} yrs`}{age && gender && ' · '}{gender}
          </p>
        </div>

        {/* About tag */}
        {about && (
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
              {about}
            </span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-8 py-5 bg-white">

        {/* Reject */}
        <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-red-400 text-red-400 hover:bg-red-100 active:scale-95 transition-all duration-150 shadow-md" onClick={()=>handleSendRequest("ignored",_id)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Like */}
        <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100 active:scale-95 transition-all duration-150 shadow-md" onClick={()=>handleSendRequest("interested",_id)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

      </div>
   </motion.div>
  );
};

export default UserCard;
