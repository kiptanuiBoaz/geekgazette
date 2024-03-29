import { useEffect, useState } from 'react';
import "./read.scss";
import { Row } from "./Row";
import { Blog, Pagination } from "../../components";
import { Trend } from '../sidebar/Trend';
import { HiTrendingUp } from 'react-icons/hi';
import { FiClock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { PostInterface } from '../../api/reduxTypes';
import { Zoom } from "react-awesome-reveal";
import { selectPosts } from '../../api/postsSlice';



export const Read = () => {
  const blogs = useSelector(selectPosts);
  const [trendingBlogs, setTredingBlogs] = useState<PostInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterdBlogs, setFilterdBlogs] = useState<PostInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  //algorithm to calculate trending props
  useEffect(() => {

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
  }, [blogs]);


  //fn to change the caegory
  const handleCategoryChange = (e: string) => setSelectedCategory(e);
  const shuffleArray = (array: PostInterface[]) => array.sort(() => Math.random() - 0.5);

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

        {filterdBlogs.length > 0
          ? shuffleArray(filterdBlogs).slice(indexOfFirstPost, indexOfLastPost).map(blog =>
            <Blog key={blog._id} {...blog} />
          )
          : <p className='no-posts'>
            <span  className='indicator'>--No posts found!</span>
             <span className='view-all' onClick={()=>handleCategoryChange("all")}>View all posts</span>
             </p>
        }

        {filterdBlogs.length > 0 &&
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={filterdBlogs.length}
          />
        }

      </div>
      <hr className='line' />


      <div className='blogs-trends-container'>
        <div className='trending'>
          <h3 className='header-trending'>Trending <HiTrendingUp /></h3>
          <Zoom cascade>
            {trendingBlogs?.slice(0, 3)?.map(blog => <Trend key={blog._id} {...blog} />)}
          </Zoom>
        </div>

        <div className='trending'>
          <h3 className='header-trending'>Latest<FiClock /></h3>
          <Zoom cascade>
            {trendingBlogs?.slice(3, 6)?.map(blog => <Trend key={blog._id} {...blog} />)}
          </Zoom>
        </div>

      </div>

    </section>

  )
}
