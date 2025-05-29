import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo4 from "../assets/images/Logo4.png";

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-opacity-50 bg-black fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl w-70 font-bold">
          <img className="h-[10vmin]" src={Logo4} alt="Logo" />
        </Link>

        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            />
          </svg>
        </button>

        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center gap-6`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold transition duration-300"
                  : "text-white hover:text-blue-400 transition duration-300"
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tours"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold transition duration-300"
                  : "text-white hover:text-blue-400 transition duration-300"
              }
            >
              TOURS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold transition duration-300"
                  : "text-white hover:text-blue-400 transition duration-300"
              }
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold transition duration-300"
                  : "text-white hover:text-blue-400 transition duration-300"
              }
            >
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`ticket/${username}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold transition duration-300"
                  : "text-white hover:text-blue-400 transition duration-300"
              }
            >
              TICKET
            </NavLink>
          </li>

          <li className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <NavLink
                  to={`profile/${username}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 px-4 py-2 rounded-full font-bold transition duration-300"
                      : "text-white px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-600 transition duration-300"
                  }
                >
                  {username}
                </NavLink>

                <button
                  onClick={onLogout}
                  className="text-white px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                LOGIN
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
