import React, { useState } from "react";
import styles from "./pagination.module.scss";
import { PaginationProps } from "../../types/paginationTypes";



export const Pagination = ({ currentPage, setCurrentPage, postsPerPage, totalPosts, }: PaginationProps) => {
    const pageNumbers = [];
    const totalPages = totalPosts / postsPerPage;
    // Limit the page Numbers 
    const [deviceWidth, setDeviceWidth] = useState<number>(0);
    const [pageNumberLimit, setpageNumberLimit] = useState(deviceWidth < 500 ? 2 : 5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(deviceWidth < 500 ? 3 : 5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    React.useEffect(() => {
        const handleEvent = () => {
            setDeviceWidth(window.innerWidth);

        }
        window.addEventListener('resize', handleEvent);
        window.addEventListener('scroll', handleEvent);
        //clean up fns
        return () => {
            window.removeEventListener('resize', handleEvent);
        };
    }, [deviceWidth]);

    // Paginate
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // GO to next page
    const paginateNext = () => {
        setCurrentPage(currentPage + 1);
        // Show next set of pageNumbers
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    // GO to prev page
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        // Show prev set of pageNumbers
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className={styles.pagination}>
            <li
                onClick={paginatePrev}
                className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ""}
            >
                Prev
            </li>

            {pageNumbers.map((number) => {
                if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return (
                        <li
                            key={number}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? `${styles.active}` : ""}
                        >
                            {number}
                        </li>
                    );
                }
                return null;
            })}

            <li
                onClick={paginateNext}
                className={
                    currentPage === pageNumbers[pageNumbers.length - 1]
                        ? `${styles.hidden}`
                        : ""
                }
            >
                Next
            </li>

            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    );
};
