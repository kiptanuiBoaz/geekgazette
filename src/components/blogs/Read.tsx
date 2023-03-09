import React from 'react';
import "./read.scss";
import { Row } from "./Row";

export const Read = () => {

  return (
    <section className='read'>
      <ul className='category-list'>
        <Row />
      </ul>

      <div className='blogs-trends-container'>

        <div className='blogs'>
          <p>blogs</p>
        </div>
        <hr />
        <div className='trends'>
          <p>trends</p>
        </div>
      </div>

    </section>

  )
}
