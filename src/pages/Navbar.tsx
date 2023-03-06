import React from "react";
import "./navbar.scss";
import logo from "../assets/navbar/logo.png"
import { navListTypes } from "../types";
import { Link } from "react-router-dom"

export const Navbar = () => {
  const navList: navListTypes[] = [
    { text: "The Developer", route: "developer" },
    { text: "Write", route: "" },
    { text: "Sign In", route: "sign-in" },
    { text: "Sign Up", route: "sign-up" },
  ]

  return (
    <nav className="navbar">
      <div >
        <img className="logo" src={logo} alt="logo" />
      </div>

      <ul className="nav-link-container">
        {navList.map(({ route, text }) =>
          <li className="nav-link">
            <Link to={route} >{text}</Link>
          </li>)
        }
      </ul>
    </nav>
  )
}
