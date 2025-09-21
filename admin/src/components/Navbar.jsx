// import React from 'react'
// import {assets} from '../assets/assets'

// const Navbar = ({setToken}) => {
//   return (
//     <div className='flex items-center py-2 px-[4%] justify-between'>
       
//         <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />

//         <button onClick={()=>setToken('')}  className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>

//     </div>
//   )
// }

// export default Navbar

import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken'); // Clear stored admin token on logout
    // Optionally, redirect to login page if needed
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />

      <button
        onClick={handleLogout}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

