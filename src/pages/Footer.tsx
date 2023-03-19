import React from 'react';
import "./footer.scss";
import { Link } from "react-router-dom";
import { FiExternalLink } from 'react-icons/fi';
import logo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png"

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='top'>
        <div className='company'>
          <img src={logo} alt="logo" />
          <p>Where geeks come to get their fix</p>

        </div>

        <div className='developer'>
          <h5>About the developer</h5>
          <a href='#'>GitHub</a>
          <a href='#'>Portfolio</a>
          <a href='#'>Twitter</a>
        </div>

        <div className='privacy'>
          <h5>Privacy</h5>
          <a href='#'>Terms {" "}<FiExternalLink/></a>
          <a href='#'>About {" "}<FiExternalLink/></a>
        </div>

        <div className='categories'>
          <h5>Porpular categories</h5>
          {["Technology", "Sports", "Religion"].map(cat => <Link to={cat}>{cat}</Link>)}
        </div >

      </div>
      <div className='bottom'>
        <p>Copyright &copy; {new Date().getFullYear()} <b>geekgazette</b>{" "}</p>
      </div>

    </footer>
  )
}
