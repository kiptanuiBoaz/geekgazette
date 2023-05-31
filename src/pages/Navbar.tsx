import { useEffect, useState } from "react";
import "./navbar.scss";
import logoGreen from "../assets/navbar/logo-no-bg-green.png";
import logoWhite from "../assets/navbar/logo-no-bg-white.png";
import { navList } from "../utils/navItems";
import { navListTypes } from "../types";
import { NavLink, useLocation } from "react-router-dom";
import { MiniProfile } from "../components";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { Profile } from "../components";


const Navbar = () => {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const { email } = useSelector((state: any) => state?.auth?.user);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    const handleEvent = () => {
      setDeviceWidth(window.innerWidth);
      setScrollPos(window.scrollY);
    }
    window.addEventListener('resize', handleEvent);
    window.addEventListener('scroll', handleEvent);
    //clean up fns
    return () => {
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('scroll', handleEvent);
    };
  }, [deviceWidth, scrollPos]);

  const navListComponent = navList.map(({ route, text }: navListTypes, i: number) =>
    <li key={i} className={scrollPos < 20 ? "nav-link-grey" : "nav-link-green"}>
      <NavLink
        to={route}
        className={({ isActive }) => isActive
          ? scrollPos < 20
            ? "active-style-grey"
            : "active-style-green"
          : undefined}
        onClick={() => {
          deviceWidth < 640 && setShowMobileNav(!showMobileNav);
        }}
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
        <div
          onClick={() => {
            setShowMobileNav(!showMobileNav);
            showProfile && setShowProfile(false);
          }}
          className="hamburger"
          style={{
            color: scrollPos > 20 ? "#eeeee4" : "#4d7e3e",
            display: deviceWidth > 640 ? "none" : ""
          }}
        >
          {!showMobileNav && !showProfile ? <HiOutlineMenuAlt3 /> : <VscChromeClose />}

        </div>

        <ul
          className={deviceWidth > 640 ? "nav-link-container" : 'mobile-nav'}
          style={{ display: !showMobileNav && deviceWidth < 640 ? "none" : "" }}
        >
          <div
            onClick={() => {
              setShowMobileNav(!showMobileNav);
              showProfile && setShowProfile(false);
            }}
            className="hamburger"
            style={{
              color: "#eeeee4",
              display: deviceWidth > 640 ? "none" : ""
            }}
          >
            {!showMobileNav && !showProfile ? <HiOutlineMenuAlt3 /> : <VscChromeClose />}

          </div>

          {navListComponent}

          {email !== null ?
            <li
              style={{ color: scrollPos < 20 ? " #6b6b6b" : "#eeeee4" }}
              className="mini-profile"
              onClick={() => {
                if (deviceWidth < 640) setShowMobileNav(!showMobileNav);
                setShowProfile(!showProfile);

              }}
            >
              <MiniProfile showProfile={showProfile} scrollPos={scrollPos} />
            </li>
            :

            <>
              <li className={scrollPos < 20 ? "nav-link-grey" : "nav-link-green"}>
                <NavLink
                  to="auth/sign-in"
                  className={({ isActive }) =>
                    isActive ? scrollPos < 20 ? "active-style-grey" : "active-style-green" : undefined
                  }

                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <button className={scrollPos < 20 ? "sign-up-btn-grey" : "sign-up-btn-green"}>
                  <NavLink style={{ color: scrollPos < 20 ? "#eeeee4" : "#4d7e3e" }} to="/auth/sign-up" className="sign-up">Sign Up</NavLink>
                </button>
              </li>
            </>
          }
        </ul>

        {showMobileNav && deviceWidth < 640 && <div
          style={{
            backgroundColor: "rgba(59, 66, 60, 0.6)",
            height: "100vh",
            width: "100vw",
            zIndex: 3,
            position: "fixed",
            marginLeft:-20,
           marginBottom:-700,
            marginTop:"-35px",
          }}>
        </div>}
        {showProfile && <Profile scrollPos={scrollPos} />}
      </nav>

    </>

  )
}

export default Navbar;