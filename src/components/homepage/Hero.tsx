import React from 'react';
import "./hero.scss";
import {NavLink} from "react-router-dom"

export const Hero = () => {
  return (
    <section className='hero'>
     
      <div className='hero-left'>
        <h1 className='slogan'>Where geeks come to get a fix</h1>
        <p className='tagline'> Lorem ipsum dolor sit amet,  elit, labore et dolore magna aliqua.</p>
        <button><NavLink to="sign-up" className="sign-up">Start Reading</NavLink></button>
      </div>

      <div className='hero-right'>
        <p>right</p>
      </div>
    </section>
  )
}
