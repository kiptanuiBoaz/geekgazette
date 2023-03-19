import React from 'react';
import TimeAgo from "../components/blogs/Timeago";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



export const FullBlog = () => {
    const { postId } = useParams()

    const blog = {
        "title": "The Importance of Sleep",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "image": "https://images.unsplash.com/photo-1678663474154-fe251019117e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        "username": "restwell",
        "date": "2022-02-15",
        "avatar": "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
        "category": "Health",
        "id": "MnwxMjA3fDB8MHxl"
    }
    const { title, content, id, date, username, avatar } = blog;
    // const formattedDate = <TimeAgo timestamp={date} />
    return (
        <article>
            {/* <div className='blog-header'>
                    <img className='avatar' src={avatar} alt={username} />
                    <h5 className='username'>{username}</h5>
                </div> */}

            <h2>{title}</h2>
            <p>{`Published ${date} by ${username}`}</p>
            <p>{content}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${id}`}>Edit Post</Link>

            </p>
        </article>
    )
}
