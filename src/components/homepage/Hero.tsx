import { useState, useEffect } from 'react';
import "./hero.scss";
import { NavLink } from "react-router-dom";
import blogImg from "../../assets/hero/illustrator.png";
import { categoryList as categories } from "../../assets/read/categories";



export const Hero = () => {
  const [displayHero, setDisplayHero] = useState<boolean>(true);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCategoryIndex(index => (index + 1) % categories.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);



  return displayHero ? (
    <div className='hero-container'>
      <hr />
      <section className='hero'>

        <div className='hero-left'>
          <h1 className='slogan'>Where geeks come to get a fix</h1>

          <p className='tagline'>
            Catch up with the latest on <span className='span'> {categories[categoryIndex]}</span>
          </p>
          <p className='tagline'>
            Get to share with like-minded geeks.
          </p>

          <button onClick={() => setDisplayHero(false)}>
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
  ) :
    <></>
}
