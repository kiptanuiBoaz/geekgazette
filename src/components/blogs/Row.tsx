import React, { useState, useEffect, useRef } from 'react';
import { categoryList } from '../../assets/read/categories';
import './row.scss';


type CarouselProps = {
    item: string;
};

export const Row = () => {

    return (
        <div className="row">
            <div className='row-items-container'>
                <p className='row-item' >All</p>
            </div>

            <select className='dropdown'  >
                <option value="">Select a category</option>
                {categoryList.map(item => <option value={item} key={item} className="row-item" > {item} </option>)}
            </select>

        </div>

    );
};
