import React, { useState, useEffect} from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector} from 'react-redux';
import { addUser } from '../utils/cartSlice';
import UserCard from './UserCArd';
import axios from 'axios';
export default function Profile() {
const user=useSelector((store)=>store.user);
const dispatch=useDispatch();

//state for showing messages
const [uploading, setUploading]=useState(false);
const [error,setError]=useState('');
const [success, setSuccess]=useState('');
const [saving, setSaving]=useState(false);

//local state for each field
const [firstName, setFirstName]=useState(user?.firstName || '');
const [lastName, setLastName]=useState(user?.lastName || '');
const [photoUrl,setPhotoUrl]=useState(user?.photoUrl);
const [age, setAge]=useState(user?.age || '');
const [gender, setGender]=useState(user?.gender || '');
const [about, setAbout]=useState(user?.about || '');
const [skills, setSkills]=useState(user?.skills?.join(', ') || '');

// Add this in Profile.jsx after your useState declarations
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
}, [user]); // runs every time user changes in Redux


  const handlePhotoUpload= async (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const formData= new FormData();
    formData.append('file',file);
    formData.append('upload_preset','devtinder');
    setUploading(true);
    setError('');
    setSuccess('');
    

    try{
      //upload directly to Cloudinary
      const uploadRes= await axios.post('https://api.cloudinary.com/v1_1/dpmulahu7/image/upload', formData);
     
      //gets the Cloudinary url 
      const newPhotoUrl= uploadRes.data.secure_url;

      //save the url to mongodb
      const saveRes=await axios.patch(BASE_URL+'/profile/edit',
        {photoUrl:newPhotoUrl},
        {withCredentials:true}
      );
      console.log("saveRes:", saveRes.data);
      //updates redux store
      if (saveRes.data.data) {
  dispatch(addUser(saveRes.data.data));
}
      //updates local state so preview updates
      setPhotoUrl(newPhotoUrl);
      setSuccess("Photo updated Successfully")
    }catch(err){
   setError(err?.response?.data?.message || err?.response?.data || 'Photo upload failed. Try again');
    }finally{
      setUploading(false);
    }
  
  };

  //handles saving other profile fields
  const handleSave= async()=>{
    setError('');
    setSuccess('');

    //convert skills string to array
    const skillsArray= skills
    .split(',')
    .map((s)=> s.trim())
    .filter(Boolean);  //remove empty strings

    //validate skills count
    if(skillsArray.length>10){
      setError("Skills cannot be more than 10");
      return;
    }
    
    setSaving(true);

    try{
      const res= await axios.patch(
        BASE_URL+'/profile/edit',
        {
          firstName,
          lastName,
          age: Number(age),
          gender,
          about,
          skills:skillsArray,
        },{
          withCredentials:true
        }
      );

      //updates redux store with updated user
      dispatch(addUser(res.data.data));
      setSuccess('Profile updated successfully!')
    }catch (err) {
   setError(err?.response?.data?.message || err?.response?.data || 'Photo upload failed. Try again');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-around space-evenly items-center p-8 bg-base-200">
      <div className="bg-base-100 rounded-2xl border border-base-300 w-full max-w-2xl overflow-hidden">
 
        {/* Header with avatar */}
        <div className="flex items-center gap-5 p-6 border-b border-base-300">
 
          {/* Photo preview */}
          <div className="relative">
            <img
              src={photoUrl || 'https://www.geographyandyou.com/images/user-profile.png'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-base-300"
              onError={(e) => {
                e.target.src = 'https://www.geographyandyou.com/images/user-profile.png';
              }}
            />
          </div>
 
          <div className="flex-1">
            <p className="font-medium text-lg">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-base-content/60">{user?.emailId}</p>
 
            {/* File input — clicking the label triggers the hidden input */}
            <label className="mt-2 cursor-pointer inline-block">
              <span className="btn btn-xs btn-outline mt-1">
                {uploading ? 'Uploading...' : 'Change photo'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
 
        {/* Form Body */}
        <div className="p-6 flex flex-col gap-4">
 
          {error && (
            <div className="alert alert-error text-sm py-2">{error}</div>
          )}
 
          {success && (
            <div className="alert alert-success text-sm py-2">{success}</div>
          )}
 
          {/* First name + Last name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-base-content/60">First name</label>
              <input
                type="text"
                className="input input-bordered input-sm"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-base-content/60">Last name</label>
              <input
                type="text"
                className="input input-bordered input-sm"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
 
          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-base-content/60">Age</label>
              <input
                type="number"
                className="input input-bordered input-sm"
                placeholder="Age (min 18)"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-base-content/60">Gender</label>
              <select
                className="select select-bordered select-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
 
          {/* About */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-base-content/60">About</label>
            <textarea
              className="textarea textarea-bordered textarea-sm resize-y"
              placeholder="Tell other developers about yourself..."
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
 
          {/* Skills */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-base-content/60">
              Skills{' '}
              <span className="text-base-content/40 text-xs">comma-separated · max 10</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder="React, Node.js, MongoDB, Python..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
 
          {/* Save button */}
          <div className="flex justify-end pt-1">
            <button
              className="btn btn-neutral btn-sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
 
        </div>
      </div>
      <div>
      {user && <UserCard user={{firstName, lastName, photoUrl, age, gender, about, skills}}/>}</div>
    </div>
  );}
