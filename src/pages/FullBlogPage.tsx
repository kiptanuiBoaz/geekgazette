import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostInterface } from '../api/reduxTypes';
import { Blog, AuthorBlog, CategoryBlog, AuthorProfile, FullBlog } from '../components';
import "./full-blog-page.scss";

interface PostsState {
    posts:{ posts: PostInterface[];}
  }

const  FullBlogPage = () => {
    const { _id:postId } = useParams();
    const blogs = useSelector((state: any) => state?.posts.posts);
    console.log(postId);

    const blog:PostInterface = blogs.find(b => b._id === postId);

    const { title, body, _id, date,username, avatarUrl, category } = blog;
    const lname = "Doe";
    const fname ="John";

    return (
        <section className='full-blog'>
            <div className='main'>

                <FullBlog {...blog} />

                <div className='more-blogs'>
                    <hr />
                    <h4 className="more-title">More from Geek Gazette</h4>
                    {blogs.map(blog => <Blog {...blog} />)}
                </div>

            </div>

            <hr />
            {/* <div className='side'>
                <div className='user-profile'>
                    <AuthorProfile avatar={avatar} lname={lname}  fname={fname} />
                </div>
                <div className='trending'>
                    <h3 className='header-trending'>{`More by ${username}`} </h3>
                    {authorBlogs.map(blog => <AuthorBlog {...blog} />)}
                </div>

                <div className='trending'>
                    <h3 className='header-trending'>{`More on ${category}`} </h3>
                    {authorBlogs.map(blog => <CategoryBlog {...blog} />)}
                </div>

            </div> */}
        </section>

    )
}

export default FullBlogPage;