import React, { useState, useEffect, useRef } from 'react';
import { categoryList } from '../../assets/read/categories';
import './row.scss';

export const Row = () => {
    const categories = categoryList
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
        for (let i = 0; i <= categories.length - 1; i++) {
            // get the width of the elements with class "row-item"
            const itemWidth = itemRefs.current[i]?.offsetWidth;
            totalWidth += itemWidth ?? 0;

            // when the width is greater than the screen width, add the current element to collapsedItems
            if (totalWidth > screenWidth - 200) {
                !collapsedItems.includes(categories[i]) && newCollapsedItems.unshift(categories[i]);

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
                setCollapsedItems((prev) => prev.filter(item => item !== categories[i]));
            }
        }

        setCollapsedItems(newCollapsedItems);
    }, [screenWidth, categories]);

    console.log({ rowItems, collapsedItems })

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

                {collapsedItems.length > 0 &&
                    <select className="dropdown" value="" onChange={e => console.log(e.target.value)}>
                        <option value="" disabled hidden>
                            more categories
                        </option>
                        {collapsedItems.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>}
            </div>

        </div>

    );
};
