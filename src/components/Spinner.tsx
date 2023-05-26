import React, { ReactNode } from 'react';
import './spinner.scss';
import { Loading } from 'notiflix';

export const Spinner = () => {
  Loading.init({svgColor:"#4d7e3e"})
  return (
    <section style={{ height: "500px" }} className='spinner'>
      <div>{Loading.dots({svgColor:"#4d7e3e"}) as ReactNode}</div>
    </section>
  );
};
