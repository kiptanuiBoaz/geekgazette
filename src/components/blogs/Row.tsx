import React, { useState, useEffect, useRef } from 'react';
import { categoryList } from '../../assets/read/categories';
import './row.scss';



export const Row = () => {
    const items = categoryList.map((item, index) => {
        return (
            <li key={index} className="row-item" >
                {item}
            </li>
        );
    });

    return (
        <div>
            <div className="row">
                <ul className='row-items-container'>  {items}</ul>
            </div>
        </div>

    );
};
