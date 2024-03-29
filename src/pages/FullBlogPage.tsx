import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Blog, AuthorBlog, CategoryBlog, AuthorProfile, FullBlog } from '../components';
import { PostInterface } from '../api/reduxTypes';
import "./full-blog-page.scss";
import { Zoom, Fade } from "react-awesome-reveal";
import { selectPosts } from '../api/postsSlice';



const FullBlogPage = () => {
    const { postId } = useParams();
    const blogs = useSelector(selectPosts);
    //current blog
    const blog: PostInterface | undefined = blogs.find((b: PostInterface) => b._id === postId);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: -200,
                behavior: 'smooth'
            });
        };
        // Scroll to top after rendering is complete
        window.requestAnimationFrame(scrollToTop);

    }, [postId]);
    // or render some other loading indicator
    if (!blog) return <div>Loading...</div>;

    const { authorEmail, category, author: { fname } } = blog;
    const authorBlogs = blogs?.filter((b: PostInterface) => b.authorEmail === authorEmail)?.filter((p: PostInterface) => p._id !== postId)?.slice(0, 3);
    const categoryBlogs = blogs?.filter((b: PostInterface) => b.category === category)?.filter((p: PostInterface) => p._id !== postId)?.slice(0, 3);

    return (
        <section className='full-blog'>
            <div className='main'>

                <FullBlog  {...blog} />

                <div className='more-blogs'>
                    <hr />
                    <h4 className="more-title">More from Geek Gazette</h4>
                    {blogs.filter((b => b._id !== postId)).slice(0, 3).map((blog: PostInterface) => <Blog key={blog._id}  {...blog} />)}
                </div>

            </div>

            <hr className='line' />
            <div className='side'>
                <div className='user-profile'>
                    <Fade cascade>
                        <AuthorProfile {...blog.author} />
                    </Fade>
                </div>

                {authorBlogs.length > 0 && (
                    <div className='trending'>
                        <h3 className='header-trending'>{`More by ${fname}`} </h3>
                        <Zoom cascade>
                            {authorBlogs.map((blog: PostInterface) => <AuthorBlog key={blog._id}  {...blog} />)}
                        </Zoom>
                    </div>
                )}

                {categoryBlogs.length > 0 && (
                    <div className='trending'>
                        <h3 className='header-trending'>{`More on ${category}`} </h3>
                        <Zoom cascade>
                            {categoryBlogs.map((blog: PostInterface) => <CategoryBlog key={blog._id}  {...blog} />)}
                        </Zoom>
                    </div>
                )}

            </div>
        </section>

    )
}

export default FullBlogPage;