import React from 'react'
import {assets} from '../assets/assets'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="bg-white text-gray-800 px-5 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-600">We deliver update at your doorstep.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact</li>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-600">
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">© 2025 ANUPAMA NEWS AGENCY. All rights reserved.</p>
    </div>
  )
}

export default Footer
