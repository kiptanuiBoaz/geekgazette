import { useState, useEffect } from 'react';
import "./hero.scss";
import { NavLink } from "react-router-dom";
import blogImg from "../../assets/hero/illustrator.png";
import { categoryList as categories } from "../../assets/read/categories";
import styled, { keyframes } from 'styled-components';

const moveDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(50%);
  }
`;

const CategoryContainer = styled.p`
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0;
  padding: 0;

`;

const CategoryText = styled.span<{ animate: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  animation-name: ${({ animate }) => animate ? moveDown : 'none'};
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;


export const Hero = () => {
  const [displayHero, setDisplayHero] = useState<boolean>(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [category, setCategory] = useState<string>("Sports");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCategoryIndex(index => (index + 1) % categories.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);



  return displayHero && (
    <div className='hero-container'>
      <hr />
      <section className='hero'>

        <div className='hero-left'>
          <h1 className='slogan'>Where geeks come to get a fix</h1>

{/* 
          <CategoryContainer> */}
            <p className='tagline'>
              Catch up with the lates on
              {/* <CategoryText animate={true}> */}
                <span> {categories[categoryIndex]}</span>
              {/* </CategoryText> */}
              and get to share with like-minded geeks.
            </p>
          {/* </CategoryContainer> */}



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
  )
}
