import React, { ReactNode } from 'react';
import './spinner.scss';
import { Loading } from 'notiflix';

export const Spinner = () => {
  return (
    <section className='spinner'>
      <div>{Loading.dots() as ReactNode}</div>
    </section>
  );
};
