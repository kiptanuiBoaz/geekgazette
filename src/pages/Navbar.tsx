import React from "react";
import "./navbar.scss";
import logoGreen from "../assets/navbar/logo-no-bg-green.png";
import logoWhite from "../assets/navbar/logo-no-bg-white.png";
import { navList } from "../utils/navItems";
import { activeStyle } from "../utils/activeStyle";
import { navListTypes } from "../types";
import { NavLink } from "react-router-dom"

export const Navbar = () => {


  const navListComponent = navList.map(({ route, text }: navListTypes, i: number) =>
    <li key={i} className="nav-link">
      <NavLink
        to={route}
        style={({ isActive }) => isActive ? activeStyle : undefined}
      >
        {text}
      </NavLink>
    </li>
  )

  return (
    <>
      <nav className="navbar">
        <div className="logo" >
          <NavLink to="/"> <img src={logoGreen} alt="logo" /></NavLink>
        </div>

        <ul className="nav-link-container">
          {navListComponent}
        </ul>

        <button>
          <NavLink to="/auth/sign-up" className="sign-up">Sign Up</NavLink>
        </button>

      </nav>
      {/* <hr/> */}
    </>

  )
}
