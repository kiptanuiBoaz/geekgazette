import React, { useEffect, useState } from 'react';
import "./comment.scss";
import { api } from '../../axios/axios';
import TimeAgo from '../../utils/Timeago';
import { useSelector } from 'react-redux';
import {MdDelete} from "react-icons/md"

interface CommentProps {
    _id: string;
    userEmail: string;
    date: string;
    text: string;
}

export const BlogComment = ({ userEmail, text, date, _id }: CommentProps) => {
    const [authorName, setAuthorName] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState('');
    const [hovered,setHovered] = useState<boolean>(false);
    const { email } = useSelector((state: any) => state.auth.user);


    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const res = await api.get(`/users/user?email=${userEmail}`);
                const { fname, lname, avatarUrl } = res.data;
                setAuthorName(`${fname} ${lname}`);
                setAuthorAvatar(avatarUrl);
            } catch (error) {
                console.log(error);
            }

        };
        fetchAuthor();
    }, []);

    const formattedDate = <TimeAgo timestamp={date} />;

    return (
        <div className='comment' key={_id}>

            <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} className='comment-content'>
                <div className='comment-header'>
                    <img className='comment-avatar' src={authorAvatar} alt='avatar' />
                    <p className='comment-author'>{authorName}</p>
                        {hovered && email === userEmail &&  <span> <MdDelete/> {" "} Delete </span>}
                    <p className='comment-date'>{formattedDate}</p>
                   
                </div>
                <p className='comment-text'>{text}</p>
             
            </div>
        </div>
    );
};

