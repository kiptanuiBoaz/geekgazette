import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";

interface TrendProps {
    title: string
    date: string;
    category: string;
    content: string;
}

export const AuthorBlog = ({ title, date, category, content }: TrendProps) => {
    const shortContent = content.substring(0, 30);
    const formattedDate = <TimeAgo timestamp= {date} />
    return (
        <article className='trend'>
            <div>

                <h2 className='title'>{title}</h2>
                <p>{shortContent}...</p>
                <div >
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
