import React, { ReactNode } from 'react';
import './spinner.scss';
import { Loading } from 'notiflix';

export const Spinner = () => {
  return (
    <section style={{ height: "500px" }} className='spinner'>
      <div>{Loading.dots() as ReactNode}</div>
    </section>
  );
};
