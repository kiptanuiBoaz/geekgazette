import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";
import { useNavigate } from 'react-router-dom';

interface TrendProps {
    title: string;
    date: string;
    _id: string;
    category: string;
    body: string;
}

export const AuthorBlog = ({ title, date, _id: postId, category, body }: TrendProps) => {
    const shortContent = body.substring(0, 30);
    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate();
    return (
        <article className='trend'>
            <div className='trend-content'>
                <h2 onClick={() => { navigate(`/blog/read/${postId}`) }} className='title'>{title}</h2>
                <p className='short-content'>{shortContent}...</p>
                
                <div className='trend-footer'>
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
