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
import { updateLikes, deletePost } from '../../api/postsSlice';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md"

const LIKES_URL = "/likes"
const POSTS_URL = "/posts"
interface CommentInterface {
    date: string;
    text: string;
    userEmail: string;
    _id: string;
}


export const FullBlog = ({ author: { fname, lname }, comments, likes, date, authorEmail, body, title, imgUrl }: BlogProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [commenting, setCommenting] = useState<boolean>(false);
    const [dispComments, setComments] = useState<CommentInterface[]>([]);
    const { email } = useSelector((state: any) => state.auth.user);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const commentInputRef = useRef<HTMLDivElement>(null);
    const { postId } = useParams();
    const likeDate = new Date();

    const formattedDate = <TimeAgo timestamp={date} />;
    const navigate = useNavigate();
    const privateApi = usePrivateApi();
    const dispatch = useDispatch();

    //forcing re-render when updating comments during  add or delete
    useEffect(() => {
        setComments(comments.slice().sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [comments]);


    //check if user is signed in
    const checkAuth = () => {
        if (email === null) {
            alert("Sign In first to like this post");
            navigate("/auth/sign-in");
            return false;
        } else {
            return true;
        }
    };

    //open comment box
    const handleCommenting = () => { setCommenting(!commenting) };

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

        } catch (err) {
            console.log(err);
        }
    };

    //delete post from DB
    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await privateApi.delete(POSTS_URL, { data: { postId } });
            // delete from redux strore
            if (res.status === 200) {
                dispatch(deletePost(postId));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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

                    {email === authorEmail && <>
                        <p
                            onMouseEnter={() => setHovered("edit")}
                            onMouseLeave={() => setHovered(null)}
                            className="post-edit"
                            onClick={() => navigate(`/blog/edit/${postId}`)}
                        >
                            {hovered === "edit" ? <span><RiEditFill /> {" "}Edit</span> : <FiEdit />} {' '}{" "}
                        </p>
                        <p
                            onClick={() => setDeleting(true)}
                            onMouseEnter={() => setHovered("delete")}
                            onMouseLeave={() => setHovered(null)}
                            className="post-edit"
                        >
                            {hovered === "delete"
                                ? <span><MdDeleteForever />{" "}Delete</span>
                                : <span><RiDeleteBinLine /></span>
                            }</p>

                    </>}

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

                    {/* post delete confirmation modal */}
                    {deleting && <div className='delete-modal'>
                        <div className='modal-content'>
                            <h5 className='delete-confirmation'>Delete Post?</h5>
                            <hr />
                            <p className='delete-description'>This can’t be undone and it will be removed from your profile</p>
                            <footer className='modal-footer'>
                                <button className='modal-delete-btn' onClick={handleDelete}>{loading ? "Deleting..." : "Proceed"}</button>
                                <button className='modal-cancel-btn' onClick={() => setDeleting(false)}>Cancel</button>
                            </footer>
                        </div>

                    </div>}

                </div>
            </div>

            <div className='comments-container'>
                {comments.length > 0 && <h5 className='comments-title'>Comments</h5>}

                {/* new comment input */}
                {commenting && <div ref={commentInputRef} className='comments-input'>
                    <NewCommentForm postId={postId} handleCommenting={handleCommenting} />
                </div>
                }

                {/* sorted comments */}
                {dispComments?.length > 0 && dispComments?.map(
                    (comment: CommentInterface) => <BlogComment key={comment._id}  {...comment} />
                )}

            </div>

        </article>
    )
}
