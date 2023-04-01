import React, { useState } from 'react';
import "./footer.scss";
import { Link } from "react-router-dom";
import { FiExternalLink } from 'react-icons/fi';
import { FaCode, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiTrendingUp } from "react-icons/hi";
import logo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png"

export const Footer = () => {
  const [hoverd, setHovered] = useState<number>(-1);
  return (
    <footer className='footer'>
      <div className='top'>
        <div className='company'>
          <Link to="/" ><img src={logo} alt="logo" /></Link>
          <p>Where geeks come to get their fix</p>
          <a href='#'>Source code <FaCode /></a>
        </div>

        <div className='developer'>
          <h5>About the developer</h5>
          <a href='#'> <BsGithub /> {" "} GitHub</a>
          <a href='#'><CgProfile /> {" "} Portfolio</a>
          <a href='#'> <FaTwitter /> {" "} Twitter</a>
          <a href='#'> <FaLinkedin /> {" "} LinkedIn</a>
        </div>

        <div className='privacy'>
          <h5>Privacy</h5>
          <a href='#'>Terms {" "}<FiExternalLink /></a>
          <a href='#'>About {" "}<FiExternalLink /></a>
        </div>

        <div className='categories'>
          <h5>Porpular categories</h5>
          {["Technology", "Sports", "Religion"].map((cat, i) =>
            <p onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}>
              <Link to={cat} >
                {cat} {hoverd === i && <HiTrendingUp />}
              </Link>
            </p>)}
        </div >

      </div>
      <div className='bottom'>
        <p>Copyright &copy; {new Date().getFullYear()} <b>geekgazette</b>{" "}</p>
      </div>

    </footer>
  )
}
