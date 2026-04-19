// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { removeUserFromFeed } from "../utils/feedSlice";
// import {motion,useMotionValue,useTransform,useAnimation} from "framer-motion";

// const UserCard = ({ user }) => {
//   const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
//   const dispatch= useDispatch();

//   // ── swipe motion values ──
//   const x = useMotionValue(0);
//   const rotate = useTransform(x, [-200, 200], [-20, 20]);
//   const likeOpacity = useTransform(x, [50, 150], [0, 1]);
//   const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);
//   const controls = useAnimation(); // ← controls the animation programmatically

//   const handleSendRequest= async(status,userId)=>{
//     try{
//       await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
//       dispatch(removeUserFromFeed(userId));
//     }catch(err){
//   //handle erroe
//  }
//   };


//   // called when buttons are clicked — animates card off screen first
//   const handleButtonClick = async (status) => {
//     const direction = status === "interested" ? 1 : -1;

//     // fly card off screen in the correct direction
//     await controls.start({
//       x: direction * 500,
//       opacity: 0,
//       transition: { duration: 0.4 }
//     });

//     // after animation completes, send request and remove from Redux
//     handleSendRequest(status, _id);
//   };

//     const handleDragEnd = (event, info) => {
//     if (info.offset.x > 100) {
//       handleSendRequest("interested", _id); // ← swiped right = like
//     } else if (info.offset.x < -100) {
//       handleSendRequest("ignored", _id);    // ← swiped left = ignore
//     }
//   };

//   return (
//      <motion.div
//       style={{ x, rotate }}  animate={controls} 
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={handleDragEnd}
//       className="relative w-100 rounded-3xl overflow-hidden shadow-2xl bg-white select-none cursor-grab active:cursor-grabbing"
//     >

//       <motion.div
//         style={{ opacity: likeOpacity }}
//         className="absolute top-8 left-6 z-10 border-4 border-green-400 text-green-400 text-3xl font-bold px-4 py-1 rounded-lg -rotate-12"
//       >
//         LIKE
//       </motion.div>

//        <motion.div
//         style={{ opacity: nopeOpacity }}
//         className="absolute top-8 right-6 z-10 border-4 border-red-400 text-red-400 text-3xl font-bold px-4 py-1 rounded-lg rotate-12"
//       >
//         NOPE
//       </motion.div>


//       {/* Photo */}
//       <div className="relative h-150 bg-gray-200">
//         <img
//           src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
//           alt={firstName}
//           className="w-full h-full object-cover"  // ← fills the container
//         />

//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

//         {/* Name + info — real data, not placeholders */}
//         <div className="absolute bottom-16 left-5 right-5 space-y-1">
//           <h2 className="text-white text-xl font-bold">
//             {firstName} {lastName}
//           </h2>
//           <p className="text-white/80 text-sm">
//             {age && `${age} yrs`}{age && gender && ' · '}{gender}
//           </p>
//         </div>

//         {/* About tag */}
//         {about && (
//           <div className="absolute bottom-5 left-5 right-5">
//             <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
//               {about}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Action buttons */}
//       <div className="flex items-center justify-center gap-8 py-5 bg-white">

//         {/* Reject */}
//         <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-red-400 text-red-400 hover:bg-red-100 active:scale-95 transition-all duration-150 shadow-md" onClick={()=>handleButtonClick("ignored")}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Like */}
//         <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100 active:scale-95 transition-all duration-150 shadow-md" onClick={()=>handleButtonClick("interested")}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//           </svg>
//         </button>

//       </div>
//    </motion.div>
//   );
// };

// export default UserCard;
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);
  const controls = useAnimation();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch(err) {}
  };

  const handleButtonClick = async (status) => {
    const direction = status === "interested" ? 1 : -1;
    await controls.start({ x: direction * 500, opacity: 0, transition: { duration: 0.35 } });
    handleSendRequest(status, _id);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) handleSendRequest("interested", _id);
    else if (info.offset.x < -100) handleSendRequest("ignored", _id);
  };

  const defaultPhoto = 'https://www.geographyandyou.com/images/user-profile.png';

  return (
    <motion.div
      animate={controls}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-80 rounded-3xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ x, rotate, boxShadow: '0 25px 60px rgba(0,0,0,0.6)', border: '1px solid #30363d' }}
    >
      {/* LIKE label */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-7 left-5 z-10 px-3 py-1 rounded-xl font-bold text-2xl font-mono tracking-wider"
        style={{ opacity: likeOpacity, border: '3px solid #39d353', color: '#39d353', transform: 'rotate(-15deg)' }}
      >
        LIKE
      </motion.div>

      {/* NOPE label */}
      <motion.div
        style={{ opacity: nopeOpacity, border: '3px solid #f85149', color: '#f85149', transform: 'rotate(15deg)' }}
        className="absolute top-7 right-5 z-10 px-3 py-1 rounded-xl font-bold text-2xl font-mono tracking-wider"
      >
        NOPE
      </motion.div>

      {/* Photo */}
      <div className="relative h-[460px] bg-[#161b22]">
        <img
          src={photoUrl || defaultPhoto}
          alt={firstName}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = defaultPhoto; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-black/20 to-transparent" />

        {/* Name + info */}
        <div className="absolute bottom-16 left-5 right-5 space-y-1.5">
          <h2 className="text-white text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-white/60 text-sm font-mono">
            {age && `${age} yrs`}{age && gender && ' · '}{gender}
          </p>
          {about && (
            <p className="text-white/70 text-sm leading-snug line-clamp-2">{about}</p>
          )}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(57,211,83,0.15)', color: '#39d353', border: '1px solid rgba(57,211,83,0.3)' }}>
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-white/40 font-mono">+{skills.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-8 py-5" style={{ background: '#0d1117', borderTop: '1px solid #30363d' }}>
        <button
          onClick={() => handleButtonClick("ignored")}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-150 active:scale-90"
          style={{ border: '2px solid #f85149', color: '#f85149', background: 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,81,73,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonClick("interested")}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-150 active:scale-90"
          style={{ border: '2px solid #39d353', color: '#39d353', background: 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(57,211,83,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;