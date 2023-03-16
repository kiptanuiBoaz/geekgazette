import React from 'react';
import "./blog.scss"

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
    const shortContent = content.substring(0, 100) + "...";
    return (
        <article className='blog'>
            <div className='blog-left'>
                <h5 className='username'><img src={avatar} alt={username} />{username}</h5>

                <h2 className='title'>{title}</h2>
                <p className='short-content'>{shortContent}</p>

                <div >
                    <p className='date'>{date}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>
            {/* <Link to={`post/${post.id}`}>Title</Link> */}

            <div className='blog-right'>
                <img src={image} alt={title} />
            </div>
        </article>
    )
}
