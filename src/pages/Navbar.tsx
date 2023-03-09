import React from "react";
import "./navbar.scss";
import logoGreen from "../assets/navbar/logo-no-bg-green.png";
import logoWhite from "../assets/navbar/logo-no-bg-white.png";

import { navListTypes } from "../types";
import { NavLink } from "react-router-dom"

export const Navbar = () => {

  const navList: navListTypes[] = [
    { text: "About", route: "developer" },
    { text: "Write", route: "" },
    { text: "Sign In", route: "sign-in" },

  ]

  const activeStyle = {
    color: "#4D7E3E",
    fontWeight: "600",
    textDecoration: "underline",
    textUnderlineThickness: "3px",
    // "&:after": {
    //   content: "",
    //   position: "absolute",
    //   width: "100%",
    //   height: "2px",
    //   bottom: "0",
    //   left: "0",
    //   backgroundColor: "#4D7E3E",

    // }
  }

  const navListComponent = navList.map(({ route, text }, i ) =>
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
          <img src={logoGreen} alt="logo" />
        </div>

        <ul className="nav-link-container">
          {navListComponent}
        </ul>

        <button><NavLink to="sign-up" className="sign-up">Sign Up</NavLink></button>

      </nav>
      <hr/>
    </>

  )
}
