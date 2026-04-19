// import React, { useState, useEffect} from 'react'
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector} from 'react-redux';
// import { addUser } from '../utils/cartSlice';
// import UserCard from './UserCArd';
// import axios from 'axios';
// export default function Profile() {
// const user=useSelector((store)=>store.user);
// const dispatch=useDispatch();

// //state for showing messages
// const [uploading, setUploading]=useState(false);
// const [error,setError]=useState('');
// const [success, setSuccess]=useState('');
// const [saving, setSaving]=useState(false);

// //local state for each field
// const [firstName, setFirstName]=useState(user?.firstName || '');
// const [lastName, setLastName]=useState(user?.lastName || '');
// const [photoUrl,setPhotoUrl]=useState(user?.photoUrl);
// const [age, setAge]=useState(user?.age || '');
// const [gender, setGender]=useState(user?.gender || '');
// const [about, setAbout]=useState(user?.about || '');
// const [skills, setSkills]=useState(user?.skills?.join(', ') || '');

// // Add this in Profile.jsx after your useState declarations
// useEffect(() => {
//   if (user) {
//     setFirstName(user.firstName || '');
//     setLastName(user.lastName || '');
//     setPhotoUrl(user.photoUrl || '');
//     setAge(user.age || '');
//     setGender(user.gender || '');
//     setAbout(user.about || '');
//     setSkills(user.skills?.join(', ') || '');
//   }
// }, [user]); // runs every time user changes in Redux


//   const handlePhotoUpload= async (e)=>{
//     const file = e.target.files[0];
//     if(!file) return;
//     const formData= new FormData();
//     formData.append('file',file);
//     formData.append('upload_preset','devtinder');
//     setUploading(true);
//     setError('');
//     setSuccess('');
    

//     try{
//       //upload directly to Cloudinary
//       const uploadRes= await axios.post('https://api.cloudinary.com/v1_1/dpmulahu7/image/upload', formData);
     
//       //gets the Cloudinary url 
//       const newPhotoUrl= uploadRes.data.secure_url;

//       //save the url to mongodb
//       const saveRes=await axios.patch(BASE_URL+'/profile/edit',
//         {photoUrl:newPhotoUrl},
//         {withCredentials:true}
//       );
//       console.log("saveRes:", saveRes.data);
//       //updates redux store
//       if (saveRes.data.data) {
//   dispatch(addUser(saveRes.data.data));
// }
//       //updates local state so preview updates
//       setPhotoUrl(newPhotoUrl);
//       setSuccess("Photo updated Successfully")
//     }catch(err){
//    setError(err?.response?.data?.message || err?.response?.data || 'Photo upload failed. Try again');
//     }finally{
//       setUploading(false);
//     }
  
//   };

//   //handles saving other profile fields
//   const handleSave= async()=>{
//     setError('');
//     setSuccess('');

//     //convert skills string to array
//     const skillsArray= skills
//     .split(',')
//     .map((s)=> s.trim())
//     .filter(Boolean);  //remove empty strings

//     //validate skills count
//     if(skillsArray.length>10){
//       setError("Skills cannot be more than 10");
//       return;
//     }
    
//     setSaving(true);

//     try{
//       const res= await axios.patch(
//         BASE_URL+'/profile/edit',
//         {
//           firstName,
//           lastName,
//           age: Number(age),
//           gender,
//           about,
//           skills:skillsArray,
//         },{
//           withCredentials:true
//         }
//       );

//       //updates redux store with updated user
//       dispatch(addUser(res.data.data));
//       setSuccess('Profile updated successfully!')
//     }catch (err) {
//    setError(err?.response?.data?.message || err?.response?.data || 'Photo upload failed. Try again');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-around space-evenly items-center p-8 bg-base-200">
//       <div className="bg-base-100 rounded-2xl border border-base-300 w-full max-w-2xl overflow-hidden">
 
//         {/* Header with avatar */}
//         <div className="flex items-center gap-5 p-6 border-b border-base-300">
 
//           {/* Photo preview */}
//           <div className="relative">
//             <img
//               src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border-2 border-base-300"
//               onError={(e) => {
//                 e.target.src = 'https://www.geographyandyou.com/images/user-profile.png';
//               }}
//             />
//           </div>
 
//           <div className="flex-1">
//             <p className="font-medium text-lg">{user?.firstName} {user?.lastName}</p>
//             <p className="text-sm text-base-content/60">{user?.emailId}</p>
 
//             {/* File input — clicking the label triggers the hidden input */}
//             <label className="mt-2 cursor-pointer inline-block">
//               <span className="btn btn-xs btn-outline mt-1">
//                 {uploading ? 'Uploading...' : 'Change photo'}
//               </span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handlePhotoUpload}
//                 disabled={uploading}
//               />
//             </label>
//           </div>
//         </div>
 
//         {/* Form Body */}
//         <div className="p-6 flex flex-col gap-4">
 
//           {error && (
//             <div className="alert alert-error text-sm py-2">{error}</div>
//           )}
 
//           {success && (
//             <div className="alert alert-success text-sm py-2">{success}</div>
//           )}
 
//           {/* First name + Last name */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-base-content/60">First name</label>
//               <input
//                 type="text"
//                 className="input input-bordered input-sm"
//                 placeholder="First name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-base-content/60">Last name</label>
//               <input
//                 type="text"
//                 className="input input-bordered input-sm"
//                 placeholder="Last name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>
//           </div>
 
//           {/* Age + Gender */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-base-content/60">Age</label>
//               <input
//                 type="number"
//                 className="input input-bordered input-sm"
//                 placeholder="Age (min 18)"
//                 min="18"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-base-content/60">Gender</label>
//               <select
//                 className="select select-bordered select-sm"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="others">Others</option>
//               </select>
//             </div>
//           </div>
 
//           {/* About */}
//           <div className="flex flex-col gap-1">
//             <label className="text-xs text-base-content/60">About</label>
//             <textarea
//               className="textarea textarea-bordered textarea-sm resize-y"
//               placeholder="Tell other developers about yourself..."
//               rows={3}
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//             />
//           </div>
 
//           {/* Skills */}
//           <div className="flex flex-col gap-1">
//             <label className="text-xs text-base-content/60">
//               Skills{' '}
//               <span className="text-base-content/40 text-xs">comma-separated · max 10</span>
//             </label>
//             <input
//               type="text"
//               className="input input-bordered input-sm"
//               placeholder="React, Node.js, MongoDB, Python..."
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//             />
//           </div>
 
//           {/* Save button */}
//           <div className="flex justify-end pt-1">
//             <button
//               className="btn btn-neutral btn-sm"
//               onClick={handleSave}
//               disabled={saving}
//             >
//               {saving ? 'Saving...' : 'Save changes'}
//             </button>
//           </div>
 
//         </div>
//       </div>
//       <div>
//       {user && <UserCard user={{firstName, lastName, photoUrl, age, gender, about, skills}}/>}</div>
//     </div>
//   );}

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/cartSlice';
import axios from 'axios';

const inputClass = "w-full bg-[#161b22] border border-[#30363d] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] placeholder-[#484f58] transition-all";
const labelClass = "block text-xs text-[#8b949e] mb-1.5 font-mono";

export default function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhotoUrl(user.photoUrl || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setAbout(user.about || '');
      setSkills(user.skills?.join(', ') || '');
    }
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'devtinder');
    setUploading(true);
    setError('');
    setSuccess('');
    try {
      const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dpmulahu7/image/upload', formData);
      const newPhotoUrl = uploadRes.data.secure_url;
      const saveRes = await axios.patch(BASE_URL + '/profile/edit', { photoUrl: newPhotoUrl }, { withCredentials: true });
      if (saveRes.data.data) dispatch(addUser(saveRes.data.data));
      setPhotoUrl(newPhotoUrl);
      setSuccess('Photo updated successfully!');
    } catch(err) {
      setError(err?.response?.data?.message || err?.response?.data || 'Photo upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsArray.length > 10) { setError('Skills cannot be more than 10.'); return; }
    setSaving(true);
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', {
        firstName, lastName, age: Number(age), gender, about, skills: skillsArray
      }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      setSuccess('Profile updated successfully!');
    } catch(err) {
      setError(err?.response?.data?.message || err?.response?.data || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
  const defaultPhoto = 'https://www.geographyandyou.com/images/user-profile.png';

  return (
    <div className="min-h-screen bg-[#0d1117] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-[#8b949e] text-sm font-mono mt-1">// edit your developer identity</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left: Edit Form ── */}
          <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden">

            {/* Avatar header */}
            <div className="flex items-center gap-4 p-6 border-b border-[#30363d]">
              <div className="relative group">
                <img
                  src={photoUrl || defaultPhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#30363d] group-hover:border-[#39d353] transition-all"
                  onError={(e) => { e.target.src = defaultPhoto; }}
                />
                <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <span className="text-white text-xs font-mono">{uploading ? '...' : 'edit'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
                </label>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{user?.firstName} {user?.lastName}</p>
                <p className="text-[#8b949e] text-sm">{user?.emailId}</p>
                <p className="text-[#39d353] text-xs font-mono mt-1">
                  {uploading ? 'uploading...' : 'hover photo to change'}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 flex flex-col gap-5">

              {error && (
                <div className="bg-[#f8514926] border border-[#f85149] rounded-lg px-3 py-2.5">
                  <p className="text-[#f85149] text-xs font-mono">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-[#39d35326] border border-[#39d353] rounded-lg px-3 py-2.5">
                  <p className="text-[#39d353] text-xs font-mono">{success}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>first_name</label>
                  <input type="text" className={inputClass} placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>last_name</label>
                  <input type="text" className={inputClass} placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>age</label>
                  <input type="number" className={inputClass} placeholder="18+" min="18" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>gender</label>
                  <select className={inputClass} value={gender} onChange={e => setGender(e.target.value)} style={{color: gender ? 'white' : '#484f58'}}>
                    <option value="" disabled>select...</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="others">others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>about <span className="text-[#484f58]">// bio</span></label>
                <textarea
                  className={inputClass + " resize-y min-h-[80px]"}
                  placeholder="Tell other developers about yourself..."
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>skills <span className="text-[#484f58]">// comma-separated · max 10</span></label>
                <input type="text" className={inputClass} placeholder="React, Node.js, MongoDB..." value={skills} onChange={e => setSkills(e.target.value)} />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#39d353] hover:bg-[#2ea043] text-[#0d1117] font-semibold text-sm rounded-lg px-6 py-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? 'saving...' : 'save_changes()'}
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Live Preview Card ── */}
          {user && (
            <div className="lg:w-80 flex flex-col gap-3">
              <p className="text-[#8b949e] text-xs font-mono">// live preview</p>
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-[#161b22] border border-[#30363d]">

                {/* Photo */}
                <div className="relative h-80 bg-[#21262d]">
                  <img
                    src={photoUrl || defaultPhoto}
                    alt={firstName}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = defaultPhoto; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-14 left-4 right-4">
                    <h2 className="text-white text-xl font-bold">{firstName || 'Your'} {lastName || 'Name'}</h2>
                    <p className="text-white/70 text-sm">
                      {age && `${age} yrs`}{age && gender && ' · '}{gender}
                    </p>
                  </div>
                  {about && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white/60 text-xs truncate">{about}</p>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {skillsArray.length > 0 && (
                  <div className="px-4 py-3 flex flex-wrap gap-1.5">
                    {skillsArray.slice(0, 5).map((skill, i) => (
                      <span key={i} className="text-xs bg-[#39d35320] text-[#39d353] border border-[#39d35340] px-2 py-0.5 rounded-full font-mono">
                        {skill}
                      </span>
                    ))}
                    {skillsArray.length > 5 && (
                      <span className="text-xs text-[#8b949e]">+{skillsArray.length - 5}</span>
                    )}
                  </div>
                )}

                {/* Buttons preview */}
                <div className="flex items-center justify-center gap-6 py-4 border-t border-[#30363d]">
                  <div className="w-12 h-12 rounded-full border-2 border-[#f85149] flex items-center justify-center text-[#f85149]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#39d353] flex items-center justify-center text-[#39d353]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}