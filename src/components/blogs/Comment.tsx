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
import { Fade, Zoom } from "react-awesome-reveal";
import { Confirm } from 'notiflix';

interface CommentProps {
    _id: string;
    userEmail: string;
    date: string;
    text: string;
}

export const BlogComment = ({ userEmail, text, date, _id }: CommentProps) => {
    const [authorName, setAuthorName] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState(null);
    const [hovered, setHovered] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        try {
            const res = await privateApi.delete(COMMENTS_URL, { data: { commentId: _id, postId } });
            //delete from redux store
            if (res.status === 200) {
                dispatch(deleteComment({ ...res.data }));
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <Fade>
            <div className='comment' key={_id}>
                <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className='comment-content'>
                    <div className='comment-header'>
                        <img className='comment-avatar' src={authorAvatar ?? "https://media.tenor.com/joLYNfFQGDgAAAAC/loading.gif"} alt='avatar' />
                        <h5 className='comment-author'>{authorName}</h5>

                        <p className='comment-date'>{formattedDate}</p>

                    </div>

                    <p className='comment-content'>
                        {text}
                        {<button
                            style={{ visibility: hovered && email === userEmail ? "visible" : "hidden" }}
                            className='delete-icon'
                            onClick={() => {
                                Confirm.show(
                                    'Want to Sign out?',
                                    'This can’t be undone, your comment will be removed permanently',
                                    loading ? "Deleting..." : "Proceed",
                                    'Cancel',
                                    () => {
                                        handleDeleteComment();
                                    },
                                    () => { }
                                );
                            }}
                        >
                            <MdDelete /> {" "} delete
                        </button>}
                    </p>


{/* 
                    {deleting && <div className='delete-modal'>
                        <Zoom>
                            <div className='modal-content'>
                                <h5 className='delete-confirmation'>Delete Comment?</h5>
                                <hr />
                                <p className='delete-description'></p>
                                <footer className='modal-footer'>
                                    <button className='modal-delete-btn' onClick={ }>{}</button>
                                    <button className='modal-cancel-btn' onClick={() => setDeleting(false)}></button>
                                </footer>
                            </div>
                        </Zoom>
                    </div>} */}

                </div>
            </div>
        </Fade>
    );
};
