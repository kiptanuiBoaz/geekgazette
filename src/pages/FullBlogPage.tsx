import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Blog, AuthorBlog, CategoryBlog, UserProfile, FullBlog } from '../components';
import "./full-blog-page.scss";



export const FullBlogPage = () => {
    const { postId } = useParams()

    const blog = {
        "title": "The Importance of Sleep",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "image": "https://images.unsplash.com/photo-1678663474154-fe251019117e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        "username": "restwell",
        "date": "2023-02-21T13:45:46.937Z",
        "avatar": "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
        "category": "Health",
        "id": "MnwxMjA3fDB8MHxl"
    }

    const blogs = [
        {
            "title": "The Benefits of Regular Exercise",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image": "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            "username": "fitlife",
            "date": "2023-04-21T13:45:46.937Z",
            "avatar": "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            "category": "Technology"
        },
        {
            "title": "The Importance of Sleep",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image": "https://images.unsplash.com/photo-1678663474154-fe251019117e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            "username": "restwell",
            "date": "2022-12-21T13:45:46.937Z",
            "avatar": "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            "category": "Health"
        },
        {
            "title": "Top 10 Tourist Attractions in Paris",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image": "https://images.unsplash.com/photo-1678329887232-a48991da8286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfENEd3V3WEpBYkV3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
            "username": "traveler",
            "date": "2022-08-21T13:45:46.937Z",
            "avatar": "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            "category": "Travel"
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
            title: "The current state of the system",
            image: "https://images.unsplash.com/photo-1678008583224-cd4f9582ef37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fENEd3V3WEpBYkV3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
            avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            username: "John Doe",
            "date": "2023-02-21T13:45:46.937Z",
            category: "technology"
        },
    ]

    const authorBlogs = [
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
            title: "The current state of the system",
            image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            username: "John Doe",
            "date": "2022-01-21T13:45:46.937Z",
            category: "technology"
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
            title: "The current state of the system",
            image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            username: "John Doe",
            "date": "2023-02-21T13:45:46.937Z",
            category: "technology"
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
            title: "The current state of the system",
            image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
            avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
            username: "John Doe",
            "date": "2023-02-21T13:45:46.937Z",
            category: "technology"
        },
    ]


    const { title, content, id, date, username, avatar, category } = blog;
   
    return (
        <section className='full-blog'>
            <div className='main'>

                <FullBlog {...blog} />
                <hr />
                <h4 className="more title">More from Geek Gazette</h4>

                {blogs.map(blog => <Blog {...blog} />)}
            </div>

            <hr />
            <div className='side'>
                <div className='userProfile'>
                    <UserProfile avatar={avatar} username={username} />
                </div>
                <div className='trending'>
                    <h3 className='header-trending'>{`More by ${username}`} </h3>
                    {authorBlogs.map(blog => <AuthorBlog {...blog} />)}
                </div>

                <div className='trending'>
                    <h3 className='header-trending'>{`More on ${category}`} </h3>
                    {authorBlogs.map(blog => <CategoryBlog {...blog} />)}
                </div>

            </div>
        </section>

    )
}
