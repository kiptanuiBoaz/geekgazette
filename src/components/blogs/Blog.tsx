import React, { useState, useEffect } from 'react';
import "./blog.scss";
import { useNavigate } from 'react-router-dom';
import TimeAgo from "../../utils/Timeago";

interface BlogProps {
    content: string;
    title: string;
    image: string;
    avatar: string;
    username: string;
    date: string;
    category: string;
    blogId: string;
}

export const Blog = ({ content, title, image, avatar, username, date, category, blogId }: BlogProps) => {
    const [brightness, setBrightness] = useState<string>("brightness(100%)");
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [shortContent, setShortContent] = useState<string>(content.substring(0, 100) + "...");
    const [shortTitle, setShortTitle] = useState<string>(title.length > 70 ? title : title.substring(0, 69) + ("..."))
    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate();




    useEffect(() => {
        const handleResize = () => {
            setDeviceWidth(window.innerWidth);
            setShortContent(content.substring(0, deviceWidth < 500
                ? 30
                : deviceWidth < 640
                    ? 50
                    : 100
            )
                + "..."
            );

            setShortTitle(title.substring(0, deviceWidth < 500
                ? 30
                : deviceWidth < 640
                    ? 35
                    : 50
            )
                + "..."
            )

        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [deviceWidth,shortContent,shortTitle]);

    return (
        <article
            key={username}
            onMouseEnter={() => setBrightness("brightness(50%)")}
            onMouseLeave={() => setBrightness("brightness(100%)")}
            className='blog'
            onClick={() => { navigate(`blog/${blogId}`) }}
        >
            <div className='blog-left'>
                <div className='blog-header'>
                    <img className='avatar' src={avatar} alt={username} />
                    <h5 className='username'>{username}</h5>
                </div>

                {/* */}
                <h2 className='title'>{shortTitle}</h2>
                <p className='short-content'>{shortContent}</p>

                <div className='blog-footer' >
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>
            {/* <Link to={`post/${post.id}`}>Title</Link> */}

            <div className='blog-right'>
                <img style={{ "filter": brightness }} className='blog-img' src={image} alt={title} />
            </div>
        </article>
    )
}
