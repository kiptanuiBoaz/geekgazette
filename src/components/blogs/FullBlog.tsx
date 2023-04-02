import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import TimeAgo from "../../utils/Timeago";
import "./full-blog.scss";
import { FaComment, FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiEditFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Comment } from './Comment';



interface BlogProps {
    username: string;
    date: string;
    content: string;
    title: string;
    image: string;
}

export const FullBlog = ({ username, date, content, title, image }: BlogProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const { blogId } = useParams();
    const formattedDate = <TimeAgo timestamp={date} />;
    const navigate = useNavigate()

    const handleLike = () => { }
    const handleComment = () => { }


    return (
        <article className='blog-article'>

            <div className='blog-container'>
                <img src={image} alt={title} className='blog-image' />
                <h2 className='title'>{title}</h2>
                <p className='header-info'>{`Published`}<span>{formattedDate}</span> {`by`} <span>{`${username}`}</span></p>
                <p className='body-content'>{content}</p>

                <div className='post-engagements'>

                    <p
                        onMouseEnter={(e) => setHovered("edit")}
                        onMouseLeave={(e) => setHovered(null)}
                        className="post-edit"
                        onClick={() => navigate(`/blog/edit/${blogId}`)}
                    >
                        {hovered === "edit" ? <RiEditFill /> : <FiEdit />} {' '}{" "} Edit
                    </p>

                    <p
                        onMouseEnter={(e) => setHovered("like")}
                        onMouseLeave={(e) => setHovered(null)}
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
                        onMouseEnter={(e) => setHovered("comment")}
                        onMouseLeave={(e) => setHovered(null)}
                        className="post-edit"
                        onClick={() => handleComment}
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
