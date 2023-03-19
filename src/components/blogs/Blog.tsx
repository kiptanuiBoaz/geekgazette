import React from 'react';
import "./blog.scss";
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()
    return (
        <article className='blog' onClick={()=>{ navigate("blog/MnwxMjA3fDB8MHxl")}}>
            <div className='blog-left'>
                <div className='blog-header'>
                    <img className='avatar' src={avatar} alt={username} />
                    <h5 className='username'>{username}</h5>
                </div>


                <h2 className='title'>{title}</h2>
                <p className='short-content'>{shortContent}</p>

                <div className='blog-footer' >
                    <p className='date'>{date}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>
            {/* <Link to={`post/${post.id}`}>Title</Link> */}

            <div className='blog-right'>
                <img className='blog-img' src={image} alt={title} />
            </div>
        </article>
    )
}
