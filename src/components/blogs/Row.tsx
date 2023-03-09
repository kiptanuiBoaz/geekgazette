import React, { useState, useEffect, useRef, ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { categories } from '../../assets/read/categories';
import "./row.scss"


// entire row
export const Row = () => {
    const [collapsedItems, setCollapsedItems] = useState<string[]>([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const rowRef = useRef<HTMLDivElement>(null);

    // adding width event listener
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // calculating the width of the items array
    useEffect(() => {
        let totalWidth = 0;
        let newCollapsedItems: string[] = [];

        // loop through the categories
        for (let i = categories.length - 1; i >= 0; i--) {
            // get the width of the elements with class "row-item"
            const itemWidth = rowRef.current?.querySelectorAll<HTMLDivElement>('.row-item')[i]?.offsetWidth;
            totalWidth += itemWidth ?? 0;

            // when the width is greater add the last element to collapsedItems
            if (totalWidth > screenWidth) {
                newCollapsedItems.unshift(categories[i]);
            } else {
                break;
            }
        }
            console.log(screenWidth,totalWidth);
        setCollapsedItems(newCollapsedItems);
    }, [screenWidth]);



    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div className="row" ref={rowRef}>
            {categories.map((item, index) => {
                // render collapsed items in dropdown
                if (collapsedItems.includes(item)) {
                    return (
                        <div key={index} className="dropdownItem">
                            {item}
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="row-item" ref={(el) => (itemRefs.current[index] = el)}>
                            {item}
                        </div>
                    );
                }
            })}
        </div>
    );
}
