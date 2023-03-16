import React, { useState, useEffect, useRef } from 'react';
import { categoryList } from '../../assets/read/categories';
import './row.scss';

export const Row = () => {
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const carouselRef = useRef<HTMLUListElement>(null);
    const [itemsPerRow, setItemsPerRow] = useState<number>();

    const handleScroll = (direction: 'left' | 'right') => {
        const carousel = carouselRef.current;
        const carouselWidth = carousel?.offsetWidth ?? 0;
        const scrollWidth = carousel?.scrollWidth ?? 0;
        const maxScrollLeft = scrollWidth - carouselWidth;

        if (direction === 'left' && scrollLeft > 0) {
            setScrollLeft(scrollLeft - carouselWidth);
        } else if (direction === 'right' && scrollLeft < maxScrollLeft) {
            setScrollLeft(scrollLeft + carouselWidth);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        const carouselWidth = carousel?.offsetWidth ?? 0;
        setItemsPerRow(Math.floor(carouselWidth / 200));// adjust based on your item size

        const handleResize = () => {
            const updatedCarouselWidth = carousel?.offsetWidth ?? 0;
            const updatedItemsPerRow = Math.floor(updatedCarouselWidth / 250); // adjust based on your item size
            const maxScrollLeft = (carousel?.scrollWidth ?? 0) - updatedCarouselWidth;

            if (updatedItemsPerRow !== itemsPerRow) {
                const newScrollLeft = Math.min(scrollLeft, maxScrollLeft);
                setScrollLeft(newScrollLeft);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [scrollLeft, itemsPerRow]);


    return (
        <div>
            <div className="row">
                <button className="carousel-control left" onClick={() => handleScroll('left')}>
                    &lt;
                </button>
                <ul className='row-items-container' ref={carouselRef} style={{ transform: `translateX(-${scrollLeft}px)` }}>
                    {/* <li className='row-item' >All</li> */}
                    {categoryList.map((item, index) => {
                        return (
                            <li key={index} className="row-item" >
                                {item}
                            </li>
                        );
                    })}
                </ul>


                <button className="carousel-control right" onClick={() => handleScroll('right')}>
                    &gt;
                </button>
            </div>

        </div>

    );
};
