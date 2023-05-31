import {useState,useEffect} from 'react';
import "./trend.scss";
import TimeAgo from "../../utils/Timeago";
import { useNavigate } from 'react-router-dom';

interface TrendProps {
    title: string
    date: string;
    _id: string
    body: string;
    author: {
        avatarUrl: string;
        fname: string;
        lname:string;
    }
}

export const CategoryBlog = ({ title, date, _id: postId, author: { avatarUrl, fname ,lname}, body }: TrendProps) => {
    const shortContent = body.substring(0, 30);
    const [shortTitle, setShortTitle] = useState<string>("");
    const formattedDate = <TimeAgo timestamp={date} />
    const navigate = useNavigate();

    useEffect(()=>setShortTitle(title.length > 48 ? title.substring(0, 47) + ("...") : title),[]);

    return (
        <article className='trend'>
            <div className='trend-content'>
                <h5 className='username'><img src={avatarUrl} alt={fname} />{fname}{" "}{lname}</h5>
                <h2
                    className='title'
                    onClick={() => {
                        navigate(`/blog/read/${postId}`);
                        window.scroll(0,0);
                    }}
                >
                    {shortTitle}
                </h2>
                <p className='short-content'>{shortContent}...</p>
                <div className='trend-footer'>
                    <p className='date'>{formattedDate}</p>

                </div>
            </div>

            {/* <hr /> */}
        </article>
    )
}
