import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets' 

const Contact = () => {
  return (
    <div>
      {/* Page Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        
        {/* Contact Image */}
        <img 
          className='w-full md:max-w-[480px] rounded-lg shadow-md' 
          src={assets.contact_img} 
          alt="Contact Us" 
        />

        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            R.n shaw chowk, Near Indian Oil Petrol Pump,854301 <br /> Purnea, Bihar, India
          </p>

          <p className='text-gray-500'>
            Tel: +91 7870224220 <br /> Email: anupamanewsagency@gmail.com
          </p>

          <p className='font-semibold text-xl text-gray-600'>Careers at Anupama News Agency</p>
          <p className='text-gray-500'>
            Interested in joining our passionate team? Discover our open positions and start your journey with us today.
          </p>
          
          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox/>
    </div>
  )
}

export default Contact
