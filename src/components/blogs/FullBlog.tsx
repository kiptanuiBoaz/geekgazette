import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TimeAgo from "../../utils/Timeago";
import "./full-blog.scss";
import { FaComment, FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiEditFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BlogComment, NewCommentForm } from '../../components';
import { BlogProps } from '../../types/blog-types/blogPropTypes';
import { useSelector, useDispatch } from 'react-redux';
import usePrivateApi from '../../hooks/usePrivateApi';
import { updateLikes } from '../../api/postsSlice';

const LIKES_URL = "/likes"
interface CommentInterface {
    date: string;
    text: string;
    userEmail: string;
    _id: string;
}


export const FullBlog = ({ author: { fname, lname }, comments, likes, date, authorEmail, body, title, imgUrl }: BlogProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [commenting, setCommenting] = useState<boolean>(false);
    const [dispComments, setComments] = useState(comments);
    const { email } = useSelector((state: any) => state.auth.user);
    const [currentUseLiked, setCurrentUserLiked] = useState<boolean>(false);

    const commentInputRef = useRef<HTMLDivElement>(null);
    const { postId } = useParams();
    const likeDate = new Date();

    const formattedDate = <TimeAgo timestamp={date} />;
    const navigate = useNavigate();
    const privateApi = usePrivateApi();
    const dispatch = useDispatch();

    //forcing re-render when updating comments during  add or delete
    useEffect(() => { setComments(comments); }, [comments])

    //check if user is signed in
    const checkAuth = () => {
        if (email === null) {
            alert("Sign In first to like this post");
            navigate("/auth/sign-in");
            return false;
        } else {
            return true;
        }
    }

    //open comment box
    const handleCommenting = () => { setCommenting(!commenting) }

    //submitting comments to server
    const handleLike = async () => {
        try {
            const res = await privateApi.put(LIKES_URL, {
                postId,
                userEmail: email,
                date: likeDate
            });

            // remove comment from react redux
            if (res.status === 200) {
                dispatch(updateLikes({ postId, ...res.data }))
            }

            console.log(res);
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <article className='blog-article'>

            <div className='blog-container'>
                <img src={imgUrl} alt={title} className='blog-image' />
                <h2 className='title'>{title}</h2>
                <p className='header-info'>
                    {`Published`}
                    <span>{formattedDate}</span>
                    {" "}  {`by`}
                    <span> {`${fname} ${lname}`}</span>
                </p>
                <p className='body-content'>{body}</p>

                <div className='post-engagements'>

                    {email === authorEmail && <p
                        onMouseEnter={() => setHovered("edit")}
                        onMouseLeave={() => setHovered(null)}
                        className="post-edit"
                        onClick={() => navigate(`/blog/edit/${postId}`)}
                    >
                        {hovered === "edit" ? <RiEditFill /> : <FiEdit />} {' '}{" "} Edit
                    </p>}

                    <p
                        onMouseEnter={() => setHovered("like")}
                        onMouseLeave={() => setHovered(null)}
                        className="post-edit"
                        onClick={() => { checkAuth() && handleLike() }}
                    >
                        {hovered !== "like"
                            ? likes.some(like => like.userEmail === email)
                                ? <span> <AiFillLike style={{ color: " #4d7e3e" }} /> {likes.length > 0 ? likes.length : ""}</span>
                                : <span><BiLike />{' '}{" "}{likes.length > 0 ? likes.length : ""}</span>
                            : <span><AiFillLike /> {' '}{" "}{likes.some(like => like.userEmail === email) ? "Unlike" : "Like"}</span>
                        }

                    </p>

                    <p
                        onMouseEnter={() => setHovered("comment")}
                        onMouseLeave={() => setHovered(null)}
                        className="post-edit"
                        onClick={() => { checkAuth() && handleCommenting() }}
                    >
                        {hovered === "comment"
                            ? <span> <FaComment /> {' '}{" "}Comment</span>
                            : <span><FaRegComment /> {comments.length > 0 ? comments.length : ""}</span>
                        }

                    </p>
                </div>
            </div>

            <div className='comments-container'>
                {comments.length > 0 && <h5 className='comments-title'>Comments</h5>}
                {commenting &&
                    <div ref={commentInputRef} className='comments-input'>
                        <NewCommentForm postId={postId} handleCommenting={handleCommenting} />
                    </div>
                }

                {dispComments?.length > 0 && comments?.map((comment: CommentInterface) => <BlogComment  {...comment} />)}


            </div>

        </article>
    )
}
