import React, { useState, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import TimeAgo from "../../utils/Timeago";
import "./full-blog.scss";
import { FaComment, FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiEditFill } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';
import { Comment, NewCommentForm } from '../../components';



interface BlogProps {
    date: string;
    body: string;
    title: string;
    imgUrl: string;
    author: {
        fname: string;
        lname: string;
        avatarUrl: string;
    }
}

export const FullBlog = ({ author: { fname, lname }, date, body, title, imgUrl }: BlogProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [commenting, setCommenting] = useState<boolean>(false);

    const commentInputRef = useRef<HTMLDivElement>(null);
    const { blogId } = useParams();

    const formattedDate = <TimeAgo timestamp={date} />;
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const handleLike = () => { }

    const handleCommenting = () => {
        setCommenting(false);
    }
    const scrollToMyElement = () => {
        if (commentInputRef && commentInputRef.current) {
            commentInputRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };


    return (
        <article className='blog-article'>

            <div className='blog-container'>
                <img src={imgUrl} alt={title} className='blog-image' />
                <h2 className='title'>{title}</h2>
                <p className='header-info'>
                    {`Published`}
                    <span>{formattedDate}</span>
                    {`by`}
                    <span> {`${fname} ${lname}`}</span>
                </p>
                <p className='body-content'>{body}</p>

                <div className='post-engagements'>

                    <p
                        onMouseEnter={() => setHovered("edit")}
                        onMouseLeave={() => setHovered(null)}
                        className="post-edit"
                        onClick={() => navigate(`/blog/edit/${blogId}`)}
                    >
                        {hovered === "edit" ? <RiEditFill /> : <FiEdit />} {' '}{" "} Edit
                    </p>

                    <p
                        onMouseEnter={() => setHovered("like")}
                        onMouseLeave={() => setHovered(null)}
                        className="post-edit"
                        onClick={() => handleLike}
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
                        onClick={() => {
                            setCommenting(true);
                            scrollToMyElement();
                        }}
                    >
                        {
                            hovered === "comment"
                                ? <span> <FaComment /> {' '}{" "}Comment</span>
                                : <span><FaRegComment /> 4</span>
                        }

                    </p>
                </div>



            </div>

            <div className='comments-container'>
                <h5 className='comments-title'>Comments</h5>
                {commenting &&
                    <div ref={commentInputRef} className='comments-input'>
                        <NewCommentForm handleCommenting={handleCommenting} />
                    </div>
                }
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />


            </div>

        </article>
    )
}
