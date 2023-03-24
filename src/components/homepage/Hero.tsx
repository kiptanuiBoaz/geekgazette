import React, { useState } from 'react';
import "./hero.scss";
import { NavLink } from "react-router-dom";
import blogImg from "../../assets/hero/illustrator.png"

export const Hero = () => {
  const [displayHero, setDisplayHero] = useState<boolean>(true);

 return    displayHero &&(
    <div className='hero-container'>
      <hr />
      <section className='hero'>

        <div className='hero-left'>
          <h1 className='slogan'>Where geeks come to get a fix</h1>
          <p className='tagline'> Lorem ipsum dolor sit amet,  elit, labore et dolore magna aliqua.</p>
          <button onClick={()=>setDisplayHero(false)}>
            <NavLink to="/" className="sign-up">
              Start Reading
            </NavLink>
          </button>
        </div>

        <div className='hero-right'>
          <img src={blogImg} />
        </div>
      </section>
    </div>
  )
}
