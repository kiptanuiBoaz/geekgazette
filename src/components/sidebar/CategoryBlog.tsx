import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";

interface TrendProps {
    title: string
    date: string;
   
    body: string;
    author:{
        avatarUrl: string;
        fname: string;
    }
}

export const CategoryBlog = ({ title, date, author:{avatarUrl,fname}, body }: TrendProps) => {
    const shortContent = body.substring(0, 30);
    const formattedDate = <TimeAgo timestamp= {date} />
    return (
        <article className='trend'>
            <div >
                <h5 className='username'><img src={avatarUrl} alt={fname} />{fname}</h5>
                <h2 className='title'>{title}</h2>
                <p className='short-content'>{shortContent}...</p>
                <div className='trend-footer'>
                    <p className='date'>{formattedDate}</p>

                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
