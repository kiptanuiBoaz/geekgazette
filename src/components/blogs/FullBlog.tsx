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
import { useSelector } from 'react-redux';

interface CommentInterface {
    date: string;
    text: string;
    userEmail: string;
    _id: string;
}


export const FullBlog = ({ author: { fname, lname }, comments, date, authorEmail, body, title, imgUrl }: BlogProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [commenting, setCommenting] = useState<boolean>(false);
    const [dispComments, setComments] = useState(comments);
    const { email } = useSelector((state: any) => state.auth.user);

    const commentInputRef = useRef<HTMLDivElement>(null);
    const { postId } = useParams();

    const formattedDate = <TimeAgo timestamp={date} />;
    const navigate = useNavigate();

    useEffect(() => {
        setComments(comments);
    }, [comments])
    const handleLike = {}

    const checkAuth = () => {
        if (email === null) {
            alert("Sign In first to like this post");
            navigate("/auth/sign-in");
            return false;
        } else {
            return true;
        }
    }

    const handleCommenting = () => {
        console.log("Commenting clicked")
        setCommenting(!commenting);
        // scrollToMyElement();
    }

    
    console.log(...comments)
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
                        onClick={() => { checkAuth() && handleLike }}
                    >
                        {
                            hovered === "like"
                                ? <span><AiFillLike /> {' '}{" "}Like</span>
                                : <span><BiLike />{' '}{" "}13</span>
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
                            : <span><FaRegComment /> 4</span>
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
