import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";
import { TrendProps } from '../../types/blog-types/trendProps';



export const Trend = ({ title,author:{ avatarUrl,lname, fname,}, date, category }: TrendProps) => {
    const [shortTitle, setShortTitle] = React.useState(title.length > 48 ? title.substring(0, 47) + ("...") : title)
    const formattedDate = <TimeAgo timestamp={date} />
    return (
        <article className='trend'>
            <div>
                <h5 className='username'><img src={avatarUrl} alt={fname} />{fname} {lname}</h5>
                <h2 className='title'>{shortTitle}</h2>

                <div >
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
