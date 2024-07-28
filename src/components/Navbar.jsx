import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#6a994e] flex text-[#fff7e1]">
      <nav className="w-full border-b-2 border-[#639248]">
        <ul className="flex justify-center space-x-60 p-4">
          <li>
            <NavLink
              to="/main"
              className={({ isActive }) =>
                `border-b-2 ${
                  isActive ? "border-[#386641]" : "border-transparent"
                } hover:border-[#386641] transition-colors duration-300`
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
                  isActive ? "border-[#386641]" : "border-transparent"
                } hover:border-[#386641] transition-colors duration-300`
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
                  isActive ? "border-[#386641]" : "border-transparent"
                } hover:border-[#386641] transition-colors duration-300`
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
