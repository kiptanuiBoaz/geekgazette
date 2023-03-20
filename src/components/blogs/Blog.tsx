import React, { useState } from 'react';
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
}

export const Blog = ({ content, title, image, avatar, username, date, category }: BlogProps) => {
    const [brightness, setBrightness] = useState<string>("brightness(100%)");
    const shortContent = content.substring(0, 100) + "...";
    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate()
    return (
        <article
            key={username}
            onMouseEnter={() => setBrightness("brightness(50%)")}
            onMouseLeave={() => setBrightness("brightness(100%)")}
            className='blog'
            onClick={() => { navigate("blog/MnwxMjA3fDB8MHxl") }}
        >
            <div className='blog-left'>
                <div className='blog-header'>
                    <img className='avatar' src={avatar} alt={username} />
                    <h5 className='username'>{username}</h5>
                </div>


                <h2 className='title'>{title}</h2>
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
