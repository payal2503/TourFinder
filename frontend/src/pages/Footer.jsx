import React from "react";
import foot1 from '../assets/images/foot1.jpg'
import foot2 from '../assets/images/foot2.jpg';
import foot3 from '../assets/images/foot3.jpg';
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4 bg-gray-600  bg-opacity-90 pt-[10vmin] ">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold"> TOURS INDIA</h2>
          <p className="text-sm mt-2 hover:text-blue-300">
            Tours India offers curated tours blending history, culture,
            and luxury across Rajasthan and beyond.
          </p>
          <div className="flex mt-4 space-x-4">
            <img
              src={foot1}
              alt="Ministry of Tourism"
              className="h-12 hover:scale-90  md:transform-none"
            />
            <img
              src={foot2}
              alt="TripAdvisor"
              className="h-12 hover:scale-90"
            />
            <img
              src={foot3}
              alt="MSME"
              className="h-12 hover:scale-90"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Golden Triangle
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                New Delhi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blogs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm  hover:text-yellow-300 bg-blue ">📞 +91 9773633778</p>
          <p className="mt-1 text-sm hover:text-yellow-300">✉ info@toursindia.com</p>
          <p className="mt-1 text-sm">
            📍 Shop no. 131, Yashwant place, Chanakyapuri, New Delhi 110021
          </p>  
          <h3 className="text-xl font-semibold text-white mb-4 pt-2">Follow Us</h3>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.035 3.684 9.207 8.437 9.878v-6.988H7.897v-2.89h2.54V9.828c0-2.505 1.493-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.772-1.63 1.56v1.875h2.773l-.443 2.89h-2.33V21.878C18.316 21.207 22 17.035 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22 5.924c-.793.351-1.644.588-2.536.693a4.478 4.478 0 0 0 1.963-2.47 8.976 8.976 0 0 1-2.832 1.083 4.468 4.468 0 0 0-7.617 4.07A12.69 12.69 0 0 1 3.1 4.725a4.472 4.472 0 0 0-.604 2.244c0 1.551.788 2.922 1.983 3.725a4.458 4.458 0 0 1-2.026-.559v.056c0 2.167 1.54 3.975 3.586 4.382a4.506 4.506 0 0 1-2.02.076c.566 1.763 2.209 3.048 4.151 3.086a8.978 8.978 0 0 1-5.555 1.914c-.361 0-.716-.021-1.068-.062a12.667 12.667 0 0 0 6.867 2.012c8.242 0 12.755-6.83 12.755-12.755 0-.194-.005-.388-.013-.58A9.128 9.128 0 0 0 22 5.924z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6" 
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.265-.058 1.645-.07 4.849-.07m0-2.163C8.756 0 8.33 0 7.052.05 5.745.1 4.448.445 3.363 1.53 2.278 2.614 1.933 3.911 1.883 5.218.833 7.495.833 8.756.833 12s0 4.505.05 6.782c.05 1.307.395 2.604 1.48 3.688 1.085 1.085 2.382 1.43 3.689 1.48 2.277.05 3.538.05 6.782.05s4.505 0 6.782-.05c1.307-.05 2.604-.395 3.689-1.48 1.085-1.085 1.43-2.382 1.48-3.689.05-2.277.05-3.538.05-6.782s0-4.505-.05-6.782c-.05-1.307-.395-2.604-1.48-3.689C20.418.445 19.121.1 17.814.05 16.495 0 15.125 0 12 0zm0 5.838a6.162 6.162 0 0 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.838 3.838 0 0 1 0-7.676 3.838 3.838 0 0 1 0 7.676zm7.421-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
              </svg>
            </a>
            </div>
            </div>
            </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-center">
      <p className="text-sm hover:text-blue-300">&copy; {new Date().getFullYear()} TourFinder. All rights reserved.</p>
      <a href='/contact'>
        <button className="mt-2 bg-white text-blue-900 py-1 px-4 rounded bg-white hover:bg-blue-200 active:bg-blue-400 focus:outline-none focus:ring focus:ring-white ">
          Get Quote
        </button>
        </a>
      </div>
    </footer>
  );
};

export default Footer;