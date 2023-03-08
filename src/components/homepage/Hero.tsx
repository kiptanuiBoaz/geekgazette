import React from 'react';
import "./hero.scss";
import { NavLink } from "react-router-dom";
import blogImg from "../../assets/hero/blogIllustrator.png"

export const Hero = () => {
  return (
    <>
      <div className='line'>
        <hr />
      </div>

      <section className='hero'>

        <div className='hero-left'>
          <h1 className='slogan'>Where geeks come to get a fix</h1>
          <p className='tagline'> Lorem ipsum dolor sit amet,  elit, labore et dolore magna aliqua.</p>
          <button><NavLink to="sign-up" className="sign-up">Start Reading</NavLink></button>
        </div>

        <div className='hero-right'>
         <img src={blogImg}/>
        </div>
      </section>
    </>
  )
}
