import React, { useEffect, useState } from 'react';
import "./comment.scss";
import { api } from '../../axios/axios';
import TimeAgo from '../../utils/Timeago';

interface CommentProps {
    _id: string;
    userEmail: string;
    date: string;
    text: string;
}
// { _id, userEmail, date, text }: CommentProps
export const BlogComment = ({userEmail,text,date,_id}:CommentProps) => {
    //fetch user immediately the component mounts
    const [authorName, setAuthorName] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState('');


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
            <div className='comment-avatar'>
                <img src={authorAvatar} alt='avatar' />
            </div>
            <div className='comment-content'>
                <div className='comment-header'>
                    <p className='comment-author'>{authorName}</p>
                    <p className='comment-date'>{formattedDate}</p>
                </div>
                <p className='comment-text'>{text}</p>
            </div>
        </div>
    );
};

