import React from 'react';
import { Link, useParams } from "react-router-dom";
import TimeAgo from "../../utils/Timeago";
import "./full-blog.scss";
import {FiEdit} from "react-icons/fi";


interface BlogProps {
    username: string;
    date: string;
    content: string;
    title: string;
    image: string;
}

export const FullBlog = ({ username, date, content, title, image }: BlogProps) => {
    const { blogId } = useParams()
    const formattedDate = <TimeAgo timestamp={date} />
    return (
        <article className='blog-article'>
           
            <div className='blog-container'>
            <img src={image} alt={title} className='blog-image' />
                <h2 className='title'>{title}</h2>
                <p className='header-info'>{`Published`}<span>{formattedDate}</span> {`by`} <span>{`${username}`}</span></p>
                <p className='body-content'>{content}</p>
                <p className="post-edit">
                    <FiEdit/> {' '}{" "}
                    <Link to={`/post/edit/${blogId}`}>Edit Post</Link>
                </p>
            </div>

        </article>
    )
}
