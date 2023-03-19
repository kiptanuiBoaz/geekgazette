import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";


interface TrendProps {
    title: string
    avatar: string;
    username: string;
    date: string;
    category: string;
}

export const Trend = ({ title, avatar, username, date, category }: TrendProps) => {
    const formattedDate = <TimeAgo timestamp= {date} />
    return (
        <article className='trend'>
            <div>
                <h5 className='username'><img src={avatar} alt={username} />{username}</h5>
                <h2 className='title'>{title}</h2>

                <div >
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
