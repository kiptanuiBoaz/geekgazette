import React, { useEffect, useState } from "react";
import "./navbar.scss";
import logoGreen from "../assets/navbar/logo-no-bg-green.png";
import logoWhite from "../assets/navbar/logo-no-bg-white.png";
import { navList } from "../utils/navItems";
import { navListTypes } from "../types";
import { NavLink } from "react-router-dom";
import { MiniProfile } from "../components";


const Navbar = () => {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);
  const [scrollPos, setScrollPos] = useState<number>(0);


  useEffect(() => {
    const handleEvent = () => {
      setDeviceWidth(window.innerWidth);
      setScrollPos(window.pageYOffset);
    }
    window.addEventListener('resize', handleEvent);
    window.addEventListener('scroll', handleEvent);
    //clean up fns
    return () => {
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('scroll', handleEvent);
    };
  }, [deviceWidth, scrollPos]);

  console.log(scrollPos, deviceWidth);


  const navListComponent = navList.map(({ route, text }: navListTypes, i: number) =>
    <li key={i} className={scrollPos < 20 ? "nav-link-grey" : "nav-link-green"}>
      <NavLink
        to={route}
        className={({ isActive }) => isActive
          ? scrollPos < 20
            ? "active-style-grey"
            : "active-style-green"
          : undefined}
      >
        {text}
      </NavLink>
    </li>
  )

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: scrollPos < 20 ? "#eeeee4" : "#4d7e3e" }} >
        <div className="logo" >
          <NavLink to="/"> <img src={scrollPos > 20 ? logoWhite : logoGreen} alt="logo" /></NavLink>
        </div>

        <ul
          className={deviceWidth > 640 ? "nav-link-container" : 'mobile-nav'}>
          {navListComponent}
          {/* <li style={{ color: scrollPos < 20 ? " #6b6b6b" : "#eeeee4" }} className="mini-profile">
            <MiniProfile scrollPos={scrollPos} />

          </li> */}

          <li>
            <button className={scrollPos < 20 ? "sign-up-btn-grey" : "sign-up-btn-green"}>
              <NavLink style={{ color: scrollPos < 20 ? "#eeeee4" : "#4d7e3e" }} to="/auth/sign-up" className="sign-up">Sign Up</NavLink>
            </button>
          </li>
        </ul>





      </nav>

    </>

  )
}

export default Navbar;