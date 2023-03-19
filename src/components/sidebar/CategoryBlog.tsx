
import React from 'react';
import "./trend.scss"

interface TrendProps {
    title: string
    date: string;
    username: string;
    avatar: string;
    content: string;
}

export const CategoryBlog = ({ title, date, avatar, username, content }: TrendProps) => {
    const shortContent = content.substring(0, 30)
    return (
        <article className='trend'>
            <div>
                <h5 className='username'><img src={avatar} alt={username} />{username}</h5>
                <h2 className='title'>{title}</h2>
                <p>{shortContent}...</p>
                <div >
                    <p className='date'>{date}</p>

                </div>
            </div>

            <hr />
        </article>
    )
}
