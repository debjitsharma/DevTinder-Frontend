
const UserCard=({user})=> {

  const {firstName, lastName, photoUrl, age, gender, about}=user;

  return (
    <div className="relative w-80 rounded-3xl overflow-hidden shadow-2xl bg-white select-none">

      {/* Photo */}
      <div className="relative h-[420px] bg-gray-200 animate-pulse">
      <img src={user.photoUrl} alt="photo"/>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Name + info */}
        <div className="absolute bottom-16 left-5 right-5 space-y-1.5">
          <div className="h-6 w-2/5 rounded-lg bg-white/30 animate-pulse" />
          <div className="h-4 w-1/3 rounded-lg bg-white/20 animate-pulse" />
        </div>

        {/* Tags */}
        <div className="absolute bottom-5 left-5 right-5 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-white/20 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-white/20 animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-white/20 animate-pulse" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-8 py-5 bg-white">

        {/* Reject */}
        <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-red-400 text-red-400 hover:bg-red-50 active:scale-95 transition-all duration-150 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Like */}
        <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-rose-500 text-rose-500 hover:bg-rose-50 active:scale-95 transition-all duration-150 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

      </div>
    </div>
  );
}
export default UserCard;