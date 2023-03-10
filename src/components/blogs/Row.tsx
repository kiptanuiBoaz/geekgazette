import React, { useState, useEffect, useRef } from 'react';
import { categoryList } from '../../assets/read/categories';
import './row.scss';

export const Row = () => {
    const categories = categoryList.reverse();
    const [collapsedItems, setCollapsedItems] = useState<string[]>([]);
    const [rowItems, setRowItems] = useState<string[]>([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const rowRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);


    // adding width event listener
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // calculate the width of the items array
    // calculating the width of the items array
    useEffect(() => {
        let totalWidth = 0;
        let newCollapsedItems: string[] = [];


        // loop through the categories in reverse order
        for (let i = categories.length - 1; i >= 0; i--) {
            // get the width of the elements with class "row-item"
            const itemWidth = itemRefs.current[i]?.offsetWidth;
            totalWidth += itemWidth ?? 0;

            // when the width is greater than the screen width, add the current element to collapsedItems
            if (totalWidth > screenWidth) {
                newCollapsedItems.unshift(categories[i]);

                 setRowItems(
                    prev => {

                        if (prev.includes(categories[i])) {
                            return prev
                        } else {
                            return ([...prev, categories[i]])
                        }

                    }
                )

            } else {
               
            }
        }

        setCollapsedItems(newCollapsedItems);
    }, [screenWidth, categories, itemRefs]);

    // console.log({rowItems})

    return (
        <div>
            <div className="row" ref={rowRef}>
                {categories.map((item, index) => {
                    // render collapsed items in dropdown
                    if (!collapsedItems.includes(item)) {

                        return (
                            <div key={index} className="row-item" ref={(el) => (itemRefs.current[index] = el)}>
                                {item}
                            </div>
                        );
                    }
                })}
            </div>
            <div>
                {collapsedItems.map((item, index) =>
                    <div key={index} className="dropdown-item">
                        {item}
                    </div>
                )}
            </div>

        </div>

    );
};
