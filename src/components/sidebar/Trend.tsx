import React from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";
import { TrendProps } from '../../types/blog-types/trendProps';
import { useNavigate } from 'react-router-dom';



export const Trend = ({ title,author:{ avatarUrl,lname, fname,}, date, _id:postId, category }: TrendProps) => {
    const [shortTitle, setShortTitle] = React.useState(title.length > 48 ? title.substring(0, 47) + ("...") : title);
    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate();
    return (
        <article className='trend'  onClick={() => { navigate(`/blog/read/${postId}`) }}>
            <div>
                <h5 className='username'><img src={avatarUrl} alt={fname} />{fname} {lname}</h5>
                <h2 className='title'>{shortTitle}</h2>

                <div className='trend-footer'>
                    <p className='date'>{formattedDate}</p>
                    <p className='category'>{category}</p>
                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
