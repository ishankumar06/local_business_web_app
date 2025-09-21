import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'


const Home = () => {
  return (
    
    <div>

      
      {/* console.log('Home page loaded') */}

   <Hero />
   
   <LatestCollection />
   <BestSeller/>
   <OurPolicy />
   <NewsletterBox />
    </div>
  )
}

export default Home