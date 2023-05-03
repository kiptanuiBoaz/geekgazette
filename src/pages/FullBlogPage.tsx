import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Blog, AuthorBlog, CategoryBlog, AuthorProfile, FullBlog } from '../components';
import { PostInterface } from '../api/reduxTypes';
import "./full-blog-page.scss";

interface PostsState {
    posts: { posts: PostInterface[]; }
}

const FullBlogPage = () => {
    const { postId } = useParams();
    const blogs = useSelector((state: PostsState) => state?.posts.posts);
    //current blog
    const blog: PostInterface | undefined = blogs.find((b: PostInterface) => b._id === postId);

    // or render some other loading indicator
    if (!blog) return <div>Loading...</div>;

    const { authorEmail, category, author: { avatarUrl, fname, lname } } = blog;
    const authorBlogs = blogs.filter((b: PostInterface) => b.authorEmail === authorEmail);
    const categoryBlogs = blogs.filter((b: PostInterface) => b.category === category);

    return (
        <section className='full-blog'>
            <div className='main'>

                <FullBlog  {...blog} />

                <div className='more-blogs'>
                    <hr />
                    <h4 className="more-title">More from Geek Gazette</h4>
                    {blogs.map((blog: PostInterface) => <Blog key={blog._id}  {...blog} />)}
                </div>

            </div>

            <hr />
            <div className='side'>
                <div className='user-profile'>
                    <AuthorProfile {...blog.author} />
                </div>
                {authorBlogs.length > 1 && <div className='trending'>
                    <h3 className='header-trending'>{`More by ${fname}`} </h3>
                    {authorBlogs.map((blog: PostInterface) => <AuthorBlog key={blog._id}  {...blog} />)}
                </div>}

                {category.length > 0 && <div className='trending'>
                    <h3 className='header-trending'>{`More on ${category}`} </h3>
                    {categoryBlogs.map((blog: PostInterface) => <CategoryBlog  key={blog._id}  {...blog} />)}
                </div>}

            </div>
        </section>

    )
}

export default FullBlogPage;