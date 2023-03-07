import React from "react";
import "./navbar.scss";
import logoGreen from "../assets/navbar/logo-no-bg-green.png";
import logoWhite from "../assets/navbar/logo-no-bg-white.png";

import { navListTypes } from "../types";
import { NavLink } from "react-router-dom"

export const Navbar = () => {

  const navList: navListTypes[] = [
    { text: "The Developer", route: "developer" },
    { text: "Write", route: "" },
    { text: "Sign In", route: "sign-in" },
    { text: "Sign Up", route: "sign-up" },
  ]

  const activeStyle={
    color:"#4D7E3E",
    fontWeight:"600" 
  }

  const navListComponent = navList.map(({ route, text }) =>
    <li className="nav-link">
      <NavLink
        to={route}
        style={({ isActive }) => isActive ? activeStyle : undefined}
      >
        {text}
      </NavLink>
    </li>
  )

  return (
    <nav className="navbar">
      <div >
        <img className="logo" src={logoGreen} alt="logo" />
      </div>

      <ul className="nav-link-container">
        {navListComponent}
      </ul>
      <hr />
    </nav>
  )
}
