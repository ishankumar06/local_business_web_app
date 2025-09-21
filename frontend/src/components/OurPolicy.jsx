// import React from 'react';
// import {assets} from '../assets/assets'

// const OurPolicy = () => {
//   return (
//     <div className='flex flex-col md:flex-row justify-between items-center my-10'>
//       <div className='text-center px-4'>
//         <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="exchange" />
//         <p className='font-semibold'>EASY EXCHANGE POLICY</p>
//         <p className='text-gray-400'>We offer hassle-free exchange policy</p>
//       </div>

//       <div className='text-center px-4'>
//         <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="return" />
//         <p className='font-semibold'>7 DAYS FREE RETURN POLICY</p>
//         <p className='text-gray-400'>7 days free return</p>
//       </div>

//       <div className='text-center px-4'>
//         <img src={assets.support_img} className='w-12 m-auto mb-5' alt="support" />
//         <p className='font-semibold'>BEST CUSTOMER SUPPORT</p>
//         <p className='text-gray-400'>We're always here to help</p>
//       </div>
//     </div>
//   );
// };

// export default OurPolicy;

import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center my-10'>
      <div className='text-center px-4'>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="exchange" />
        <p className='font-semibold'>EASY BOOKING</p>
        <p className='text-gray-400'>We offer hassle-free booking experience</p>
      </div>

      <div className='text-center px-4'>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="return" />
        <p className='font-semibold'>HASSLE FREE DELIVERY ON TIME</p>
        <p className='text-gray-400'>We're always here to help</p>
      </div>

      <div className='text-center px-4'>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="support" />
        <p className='font-semibold'>BEST CUSTOMER SUPPORT</p>
        <p className='text-gray-400'>Always here to help you</p>
      </div>
    </div>
  );
};

export default OurPolicy;
