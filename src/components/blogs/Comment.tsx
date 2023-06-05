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
import { Fade } from "react-awesome-reveal";
import { Confirm } from 'notiflix';
import { CommentProps } from '../../types/comment-types/commentTypes';
import { selectUser } from '../../api/authSlice';



export const BlogComment = ({ userEmail, text, date, _id }: CommentProps) => {
    const [authorName, setAuthorName] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    //currently signed in  user from redux store
    const { email } = useSelector(selectUser);
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
                <div  className='comment-content'>
                    <div className='comment-header'>
                        <img className='comment-avatar' src={authorAvatar ?? "https://media.tenor.com/joLYNfFQGDgAAAAC/loading.gif"} alt='avatar' />
                        <h5 className='comment-author'>{authorName}</h5>

                        <p className='comment-date'>{formattedDate}</p>

                    </div>

                    <p className='comment-content'>
                        {text}

                    </p>
                    {<button
                        style={{ visibility: email === userEmail ? "visible" : "hidden" }}
                        className='delete-icon'
                        onClick={() => {
                            Confirm.show(
                                'Want to delete this comment?',
                                'This can’t be undone, your comment will be removed permanently',
                                loading ? "Deleting..." : "Proceed",
                                'Cancel',
                                () => { handleDeleteComment(); },
                                () => { },
                                {
                                    okButtonBackground: " #4d7e3e",
                                    titleColor: "#4d7e3e",
                                    borderRadius: "15px",
                                    distance: "20px",
                                    cssAnimationStyle: "zoom",
                                    buttonsFontSize: "17px",
                                    titleFontSize: "18px"
                                }
                            );
                        }}
                    >
                        <MdDelete /> {" "} delete
                    </button>}
                </div>
            </div>
        </Fade>
    );
};
