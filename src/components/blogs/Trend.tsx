import React from 'react';
import "./trend.scss"

interface TrendProps {
    title: string
    avatar: string;
    username: string;
    date: string;
    category: string;
}

export const Trend = ({ title, avatar, username, date, category }: TrendProps) => {
    return (
        <article className='trend'>
            <h5 className='username'><img src={avatar} alt={username} />{username}</h5>
            <h2 className='title'>{title}</h2>

            <div >
                <p className='date'>{date}</p>
                <p className='category'>{category}</p>
            </div>
            <hr/>
        </article>
    )
}
