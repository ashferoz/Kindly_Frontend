import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#b78ed9] fixed top-0 left-0 w-full text-[#fff7e1] z-50 font-epilogue">
      <nav className="border-b-2 border-[#ae7ed4]">
        <ul className="flex justify-center space-x-60 p-4">
          <li>
            <NavLink
              to="/main"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-[#8052a4]" : "border-transparent"
                } hover:border-[#a36dcc] transition-colors duration-300`
              }
            >
              Main
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-[#ae7ed4]" : "border-transparent"
                } hover:border-[#a36dcc] transition-colors duration-300`
              }
            >
              Inbox
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-[#ae7ed4]" : "border-transparent"
                } hover:border-[#a36dcc] transition-colors duration-300`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
