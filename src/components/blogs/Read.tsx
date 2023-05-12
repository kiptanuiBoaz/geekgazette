import { useEffect, useState } from 'react';
import "./read.scss";
import { Row } from "./Row";
import { Blog } from "../../components/index";
import { Trend } from '../sidebar/Trend';
import { HiTrendingUp } from 'react-icons/hi';
import { FiClock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { PostInterface } from '../../api/reduxTypes';

interface PostsState {
  posts: { posts: PostInterface[]; }
}

export const Read = () => {
  const blogs = useSelector((state: PostsState) => state?.posts.posts);
  const [trendingBlogs, setTredingBlogs] = useState<PostInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterdBlogs, setFilterdBlogs] = useState<PostInterface[]>([]);

  //algorithm to calculate trending props
  useEffect(() => {
    // setLoading(true);
    setTredingBlogs(
      blogs.slice().sort((a, b) => {
        // Sort by date created
        if (new Date(a.date) < new Date(b.date)) return 1;
        if (new Date(a.date) > new Date(b.date)) return -1;

        // Sort by total engagements (likes + comments)
        const totalEngagementsA = a.likes.length + a.comments.length;
        const totalEngagementsB = b.likes.length + b.comments.length;
        if (totalEngagementsA < totalEngagementsB) return 1;
        if (totalEngagementsA > totalEngagementsB) return -1;

        // Sort by number of comments
        if (a.comments.length < b.comments.length) return 1;
        if (a.comments.length > b.comments.length) return -1;

        // Sort by most recent comment
        const lastCommentA = new Date(a.comments[a.comments.length - 1].date);
        const lastCommentB = new Date(b.comments[b.comments.length - 1].date);
        if (lastCommentA < lastCommentB) return 1;
        if (lastCommentA > lastCommentB) return -1;

        // Default: no sorting needed
        return 0;
      }))
      // setLoading(false);
  }, [blogs]);


  //fn to change the caegory
  const handleCategoryChange = (e: string) => {
    setSelectedCategory(e);
  };

  //filter the blogs 
  useEffect(() => {
    setFilterdBlogs(selectedCategory === "all"
      ? blogs.slice()
      : blogs.slice().filter(blog => blog.category === selectedCategory)
    )

  }, [blogs, selectedCategory]);

  return (
    <section className='read'>

      <div className='blogs'>

        <div className='category-list'>
          <Row handleCategoryChange={handleCategoryChange} />
        </div>

        {filterdBlogs.map(blog => <Blog key={blog._id} {...blog} />)}

      </div>

      <hr className='line' />

      <div className='blogs-trends-container'>

        <div className='trending'>
          <h3 className='header-trending'>Trending <HiTrendingUp /></h3>
          {trendingBlogs?.slice(0, 3)?.map(blog => <Trend key={blog._id} {...blog} />)}
        </div>

        <div className='trending'>
          <h3 className='header-trending'>Latest<FiClock /></h3>
          {trendingBlogs?.slice(3, 6)?.map(blog => <Trend key={blog._id} {...blog} />)}
        </div>

      </div>

    </section>

  )
}
