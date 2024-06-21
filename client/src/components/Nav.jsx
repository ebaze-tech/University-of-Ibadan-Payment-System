/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/authContext";
import { GoSearch } from "react-icons/go";
import { IoIosHelpCircle } from "react-icons/io";
import Logo from "../assets/items_logo.svg";

const Nav = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="grid md:grid-cols-3 md:px-10 px-5 py-2 md:py-4 md:gap-0 gap-4">
      {/* Logo */}
      <div>
        <img src={Logo} alt="logo" className="md:w-32 w-20" />
      </div>
      {/* Search Bar */}
      <form
        className="flex justify-center items-center border-2 border-gray-200 rounded-xl px-4 md:h-auto h-10 gap-4 focus-within:border-gray-400 transition duration-200 ease-in-out"
      >
        <GoSearch className="text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search for items"
          value={searchTerm}
          onChange={handleChange}
          className="w-full outline-none border-none"
        />
      </form>
      {/* Help Icon and Login Button */}
      <div className="flex items-center md:gap-4 gap-2 md:justify-end">
        <IoIosHelpCircle className="md:text-5xl text-3xl text-blue-500" />
        {isAuthenticated ? (
          <>
            <Link to="/">
              <button className="bg-blue-500 text-white px-4 md:text-base text-sm md:px-6 md:py-2 py-1 rounded-xl">
                Home
              </button>
            </Link>
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 md:text-base text-sm md:px-6 md:py-2 py-1 rounded-xl">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 md:text-base text-sm md:px-6 md:py-2 py-1 rounded-xl">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 md:text-base text-sm md:px-6 md:py-2 py-1 rounded-xl">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
