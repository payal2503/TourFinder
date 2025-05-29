import React from "react";
import about from '../assets/images/about.jpg'
import about2 from '../assets/images/about2.jpg'
import profile3 from'../assets/images/profile3.jpg';
import profile1 from '../assets/images/profile2.jpg'

const About = () => {
  return (
    <div className="min-h-scree bg-gray-200">
      <div className="relative bg-cover bg-center bg-no-repeat h-96" style={{ backgroundImage: `url(${about})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            About Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Discover the World with Tour Finder</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Tour Finder, we believe that travel is not just a journey but an experience that transforms you. Our mission is to make travel easy, accessible, and tailored to your needs. Whether you're exploring exotic destinations, uncovering hidden gems, or enjoying luxury stays, we are here to create unforgettable moments.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a team of experienced travel enthusiasts, cutting-edge technology, and a passion for exploration, Tour Finder has helped countless travelers embark on their dream adventures. Let us guide you to your next great escape.
            </p>
          </div>

          <div>
            <img
              src={about2}
              alt="Travel"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 py-12 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold">10,000+</h3>
            <p className="mt-2">Happy Travelers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="mt-2">Destinations</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">5+</h3>
            <p className="mt-2">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="mt-2">Customer Support</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src={profile1}
              alt="Team Member"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Payal Singh</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={profile3}
              alt="Team Member"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Ansh Singh</h3>
            <p className="text-gray-600">Marketing Head</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={profile3}
              alt="Team Member"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Ghonchuu </h3>
            <p className="text-gray-600">Travel Specialist</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-300 mb-6">
          Let us help you plan the perfect trip. Explore the world with Tour Finder today!
        </p>
        <a href="/contact">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
          Contact Us
        </button>
        </a>
        
      </div>
    </div>
  );
};

export default About;
