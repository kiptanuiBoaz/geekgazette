import React, { useState, useEffect } from 'react';
import "./blog.scss";
import { useNavigate } from 'react-router-dom';
import TimeAgo from "../../utils/Timeago";
import { BlogProps } from '../../types/blog-types/blogPropTypes';
import { animateScroll } from 'react-scroll';

// const scrollToTop = () => {
//   animateScroll.scrollToTop();
// }




export const Blog = ({ body, title, imgUrl, date, category, _id: postId, author: { fname, avatarUrl, lname } }: BlogProps) => {
    const [brightness, setBrightness] = useState<string>("brightness(100%)");
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [shortBody, setShortBody] = useState<string>("");
    const [shortTitle, setShortTitle] = useState<string>(title.length > 70 ? title : title.substring(0, 69) + ("..."));
    const [dots, setDots] = useState<string>("");
    const [titleDots, setTitleDots] = useState<string>("");

    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate();

    //body readmore dots
    useEffect(() => { setDots(body.length > shortBody.length ? "..." : "") }, [deviceWidth, body, shortBody]);

    //title readmore dots
    useEffect(() => { setTitleDots(title.length > shortTitle.length ? "..." : "") }, [deviceWidth, title, shortTitle]);

    //truncate the blog content
    useEffect(() => {
        setShortBody(body.substring(0, deviceWidth < 500 ? 30 :
            deviceWidth < 640
                ? 50
                : 100
        ))
    }, [deviceWidth, shortBody]);

    //truncate the title length
    useEffect(() => {
        setShortTitle(title.substring(0, deviceWidth < 500 ? 30 :
            deviceWidth < 640
                ? 55
                : 70
        ))
    }, [deviceWidth, shortTitle]);

    //monitor the screen width
    useEffect(() => {
        const handleResize = () => { setDeviceWidth(window.innerWidth); };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [deviceWidth]);

    return (
        <article
            key={fname}
            onMouseEnter={() => setBrightness("brightness(50%)")}
            onMouseLeave={() => setBrightness("brightness(100%)")}
            className='blog'
            onClick={() => {
                navigate(`/blog/read/${postId}`);
                // window.scrollTo(0,0);
            }}
        >
            <div className='blog-left'>
                <div className='blog-header'>
                    <img className='avatar' src={avatarUrl} alt={fname} />
                    <h5 className='username'>{fname} {lname}</h5>
                </div>

                {/* */}
                <h2 className='title'>{shortTitle}{titleDots}</h2>
                <p className='short-content'>{shortBody}{dots}</p>

                <div className='blog-footer' >
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            <div className='blog-right'>
                <img style={{ "filter": brightness }} className='blog-img' src={imgUrl} alt={title} />
            </div>
        </article>
    )
}
