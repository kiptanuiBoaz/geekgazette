import React, { useEffect, useState } from 'react';
import "./comment.scss";
import { api } from '../../axios/axios';
import TimeAgo from '../../utils/Timeago';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md"
import { deleteComment } from '../../api/postsSlice';
import usePrivateApi from '../../hooks/usePrivateApi';
const COMMENTS_URL = "/comments"
import { useParams } from 'react-router-dom';

interface CommentProps {
    _id: string;
    userEmail: string;
    date: string;
    text: string;
}

export const BlogComment = ({ userEmail, text, date, _id }: CommentProps) => {
    const [authorName, setAuthorName] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState('');
    const [hovered, setHovered] = useState<boolean>(false);

    //currently signed in  user from redux store
    const { email } = useSelector((state: any) => state.auth.user);
    const formattedDate = <TimeAgo timestamp={date} />;

    //currrent post
    const { postId } = useParams();
    const dispatch = useDispatch();
    const privateApi = usePrivateApi();

    //fetch comment author 
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


    //delete commetn from db
    const handleDeleteComment = async () => {
        try {
            const res = await privateApi.delete(COMMENTS_URL, { data: { commentId: _id, postId } });
            //delete from redux store
            if (res.status === 200) {
                dispatch(deleteComment({ ...res.data }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='comment' key={_id}>
            <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className='comment-content'>
                <div className='comment-header'>
                    <img className='comment-avatar' src={authorAvatar} alt='avatar' />
                    <p className='comment-author'>{authorName}</p>
                    {hovered && email === userEmail && <span onClick={() => handleDeleteComment()}> <MdDelete /> {" "} Delete </span>}
                    <p className='comment-date'>{formattedDate}</p>

                </div>
                <p className='comment-text'>{text}</p>

            </div>
        </div>
    );
};
