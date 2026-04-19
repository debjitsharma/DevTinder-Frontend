// import React, { useEffect } from 'react'
// import UserCard from './UserCArd'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { BASE_URL } from '../utils/constants';
// import { addFeed } from '../utils/feedSlice'


// const Feed = () => {

//   const feed=useSelector((store)=>store.feed);
//   const dispatch= useDispatch();

//    const getFeed= async ()=>{
//     if(feed) return;
//     try{
//       const res= await axios.get(BASE_URL+"/feed",
//         {withCredentials:true});
//         dispatch(addFeed(res.data.data));
//     }catch(err){
//       console.error("Feed fetch error:", err?.response?.status, err?.message);
//     }

//    }

//    useEffect(()=>{getFeed();},[]);
//    if(!feed) return null;
//    if(feed.length<=0)
//     return <h1>No more users to show</h1>;
//   return (
//     <div className='flex justify-center my-10'><UserCard key={feed[0]._id} user={feed[0]}/></div>
//   )
// }

// export default Feed
import React, { useEffect } from 'react';
import UserCard from './UserCArd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch(err) {
      console.error("Feed fetch error:", err?.response?.status, err?.message);
    }
  };

  useEffect(() => { getFeed(); }, []);

  if (!feed) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#39d353] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#8b949e] text-sm font-mono">loading feed...</p>
      </div>
    </div>
  );

  if (feed.length <= 0) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-white text-xl font-bold mb-2">You've seen everyone!</h2>
        <p className="text-[#8b949e] text-sm font-mono">// no more devs in the queue</p>
        <p className="text-[#8b949e] text-sm mt-1">Check back later for new developers</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center py-10 px-4">

      {/* Hint text */}
      <p className="text-[#8b949e] text-xs font-mono mb-6">
        // drag to swipe · <span className="text-[#f85149]">left = ignore</span> · <span className="text-[#39d353]">right = interested</span>
      </p>

      {/* Card */}
      <UserCard key={feed[0]._id} user={feed[0]} />

      {/* Remaining count */}
      {feed.length > 1 && (
        <p className="text-[#484f58] text-xs font-mono mt-6">
          {feed.length - 1} more developer{feed.length - 1 !== 1 ? 's' : ''} in queue
        </p>
      )}
    </div>
  );
};

export default Feed;