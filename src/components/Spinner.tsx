import React from 'react';
import "./spinner.scss";
import { Loading } from 'notiflix';

export const Spinner = () => {
  return (
  <section className='spinner'>
    <div>{Loading.dots()}</div>

  </section>
  )
}
