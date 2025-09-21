import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            We are dedicated to bringing you the best selection of newspapers and books. Our passion is to connect readers with quality content and reliable information through an easy and enjoyable shopping experience.
          </p>
          <p>
            Focused on variety, affordability, and trustworthiness, we continuously update our collection to keep you informed and entertained with the latest news and captivating stories.
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission is to provide a seamless and accessible platform where everyone can discover and enjoy newspapers and books that inspire knowledge, curiosity, and lifelong learning.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Curated Quality</b>
          <p className="text-gray-600">
            Every newspaper and book in our collection is carefully selected to meet high standards of authenticity, content quality, and reader satisfaction.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenient Shopping</b>
          <p className="text-gray-600">
            Our intuitive platform ensures easy browsing, fast search, and prompt delivery so you can enjoy your favorite reads without hassle.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Dedicated Support</b>
          <p className="text-gray-600">
            Our expert customer service team is always ready to assist you, providing friendly and timely help throughout your shopping journey.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <NewsletterBox />
    </div>
  );
};

export default About;
