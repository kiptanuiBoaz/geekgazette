import React from 'react';
import "./footer.scss";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png"

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='company'>
        <img src={logo} alt="logo" />
        <p>Where geeks come to get their fix</p>
        <p>Copyright &copy; {new Date().getFullYear()} <b>geekgazette</b>{" "}</p>
      </div>

      <div className='developer'>
        <h5>About the developer</h5>
        <a href='#'>GitHub</a>
        <a href='#'>Portfolio</a>
        <a href='#'>Twitter</a>
      </div>

      <div className='privacy'>
        <h5>Privacy</h5>
        <a href='#'>Terms</a>
        <a href='#'>About</a>
      </div>

      <div className='categories'>
        <h5>Porpular categories</h5>
        {["Technology", "Sports", "Religion"].map(cat => <Link to={cat}>{cat}</Link>)}
      </div >

    </footer>
  )
}
