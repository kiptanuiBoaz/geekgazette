import { useState, useEffect } from 'react';
import "./hero.scss";
import { NavLink } from "react-router-dom";
import blogImg from "../../assets/hero/illustrator.png";
import { categoryList as categories } from "../../assets/read/categories";
import { setReading } from '../../api/navSlice';
import { useDispatch } from 'react-redux';



export const Hero = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCategoryIndex(index => (index + 1) % categories.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (

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

          <button onClick={() => dispatch(setReading(true))}>
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
