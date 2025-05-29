import React from 'react';
import { FaGlobe, FaUsers, FaStar, FaDollarSign } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGlobe className="text-blue-500 text-4xl" />,
      title: 'Wide Range of Destinations',
      description: 'Explore tours to destinations across the globe with unmatched variety and experiences.',
    },
    {
      icon: <FaUsers className="text-green-500 text-4xl" />,
      title: 'Expert Tour Guides',
      description: 'Our professional guides ensure every journey is enriching and hassle-free.',
    },
    {
      icon: <FaStar className="text-yellow-500 text-4xl" />,
      title: 'Top Reviews & Ratings',
      description: 'We are trusted by thousands of happy travelers for providing exceptional service.',
    },
    {
      icon: <FaDollarSign className="text-purple-500 text-4xl" />,
      title: 'Affordable Packages',
      description: 'Enjoy premium travel experiences at prices that fit your budget.',
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">Why Choose Us?</h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover why thousands of travelers trust us for their dream vacations.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
