// import React, { useState } from 'react'
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/cartSlice';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/constants';


// const Login = () => {
//   const [emailId, setEmailId]= useState("");
//   const [password,setPassword] = useState("");
//  const [firstName,setFirstName] = useState("");
//   const [lastName,setLastName] = useState("");
//   const [isLoginForm,setLoginForm]=useState(true);
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSignup =async(e)=>{
//      e.preventDefault();
//      try{
//       const res=await axios.post(
//         BASE_URL+"/signup",
//         {
//           firstName,lastName,emailId,password 
//         },{withCredentials:true}
//       );
//       console.log(res.data.data);
//       dispatch(addUser(res.data.data));
//       navigate("/profile");
//      }
//      catch(err){
//       setError(err?.response?.data || "Something went wrong");
//      }
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(BASE_URL+"/login", {
//         emailId,
//         password,
//       },{withCredentials:true});
//       dispatch(addUser(res.data));
//       navigate("/feed");
//     } catch(err) {
//       setError(err?.response?.data?.message || "Login failed. Please check credentials or backend server.");
//     }
//   }
//   return (
//     <div>
//       <section className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//             <img
//               className="w-8 h-8 mr-2"
//               src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
//               alt="logo"
//             />
//             DevTinder
//           </a>
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                {isLoginForm?"Sign in to your account":"Create your account"}
//               </h1>
//               <form className="space-y-4 md:space-y-6" onSubmit={isLoginForm ? handleSubmit : handleSignup}>
//                 <div>
//                 {!isLoginForm && (<>       <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     value={firstName}
//                     onChange={(e)=>setFirstName(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="First Name"
//                     required
//                   />
//                   <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     id="lastName"
//                     value={lastName}
//                     onChange={(e)=>setLastName(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Last Name"
//                     required
//                   /></>)}
//                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={emailId}
//                     onChange={(e)=>setEmailId(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="alamsoda@gmail.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={password}
//                     onChange={ (e)=>setPassword(e.target.value)} 
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         id="remember"
//                         name="remember"
//                         type="checkbox"
//                         checked={remember}
//                         onChange={(e) => setRemember(e.target.checked)}
//                         aria-describedby="remember"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                       />
//                     </div>
//                     <div className="ml-3 text-sm">
//                       <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                   <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
//                     Forgot password?
//                   </a>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   {isLoginForm ? "Sign in" : "Sign up"}
//                 </button>
//                 {error && <p className="text-sm text-red-500">{error}</p>}
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   {isLoginForm ? "Don't have an account yet?" : "Already have an account?"}{' '}
//                   <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => setLoginForm(!isLoginForm)}>
//                     {isLoginForm ? "Sign up" : "Sign in"}
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/cartSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName, lastName, emailId, password
      }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch(err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId, password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch(err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#161b22] border-r border-[#30363d] p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#39d353] flex items-center justify-center text-[#0d1117] font-black text-sm font-mono">
            &lt;/&gt;
          </div>
          <span className="text-white font-bold text-lg">Dev<span className="text-[#39d353]">Tinder</span></span>
        </div>

        <div>
          <div className="font-mono text-[#39d353] text-sm mb-6 space-y-1">
            <p><span className="text-[#8b949e]">const</span> <span className="text-[#79c0ff]">dev</span> = {"{"}</p>
            <p className="pl-4"><span className="text-[#79c0ff]">passion</span>: <span className="text-[#a5d6ff]">"building things"</span>,</p>
            <p className="pl-4"><span className="text-[#79c0ff]">looking</span>: <span className="text-[#a5d6ff]">"collaborators"</span>,</p>
            <p className="pl-4"><span className="text-[#79c0ff]">status</span>: <span className="text-[#39d353]">"open to connect"</span></p>
            <p>{"}"}</p>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Swipe right on<br />
            <span className="text-[#39d353]">your next teammate.</span>
          </h1>
          <p className="text-[#8b949e] text-base leading-relaxed">
            Match with developers who share your stack, your ambitions, and your obsession with clean code.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-bold text-white font-mono">10k+</p>
            <p className="text-[#8b949e] text-xs mt-0.5">developers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white font-mono">50+</p>
            <p className="text-[#8b949e] text-xs mt-0.5">tech stacks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white font-mono">∞</p>
            <p className="text-[#8b949e] text-xs mt-0.5">connections</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#39d353] flex items-center justify-center text-[#0d1117] font-black text-sm font-mono">
              &lt;/&gt;
            </div>
            <span className="text-white font-bold text-lg">Dev<span className="text-[#39d353]">Tinder</span></span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            {isLoginForm ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-[#8b949e] text-sm mb-8">
            {isLoginForm ? "Sign in to continue building connections" : "Join thousands of developers"}
          </p>

          <form onSubmit={isLoginForm ? handleSubmit : handleSignup} className="space-y-4">

            {/* Signup extra fields */}
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#8b949e] mb-1.5 font-mono">first_name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Debjit"
                    required
                    className="w-full bg-[#161b22] border border-[#30363d] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] placeholder-[#484f58] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b949e] mb-1.5 font-mono">last_name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sharma"
                    required
                    className="w-full bg-[#161b22] border border-[#30363d] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] placeholder-[#484f58] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs text-[#8b949e] mb-1.5 font-mono">email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="dev@example.com"
                required
                className="w-full bg-[#161b22] border border-[#30363d] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] placeholder-[#484f58] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-[#8b949e] mb-1.5 font-mono">password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#161b22] border border-[#30363d] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#39d353] focus:ring-1 focus:ring-[#39d353] placeholder-[#484f58] transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#f8514926] border border-[#f85149] rounded-lg px-3 py-2.5">
                <p className="text-[#f85149] text-xs font-mono">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#39d353] hover:bg-[#2ea043] text-[#0d1117] font-semibold text-sm rounded-lg py-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? (isLoginForm ? "Signing in..." : "Creating account...")
                : (isLoginForm ? "Sign in" : "Create account")}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-[#8b949e] text-sm text-center mt-6">
            {isLoginForm ? "New to DevTinder?" : "Already have an account?"}{' '}
            <button
              onClick={() => { setLoginForm(!isLoginForm); setError(""); }}
              className="text-[#39d353] hover:underline font-medium"
            >
              {isLoginForm ? "Create account" : "Sign in"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;