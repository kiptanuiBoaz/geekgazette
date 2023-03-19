import React from 'react';
import "./trend.scss"

interface TrendProps {
    title: string
    date: string;
    category: string;
    content: string;
}

export const AuthorBlog = ({ title, date, category, content }: TrendProps) => {
    const shortContent = content.substring(0, 30)
    return (
        <article className='trend'>
            <div>

                <h2 className='title'>{title}</h2>
                <p>{shortContent}...</p>
                <div >
                    <p className='date'>{date}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            <hr />
        </article>
    )
}
