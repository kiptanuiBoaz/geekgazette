import React from 'react';
import "./read.scss";
import { Row } from "./Row";
import { Blog } from "../../components/index";
import { Trend } from '../sidebar/Trend';
import { HiTrendingUp } from 'react-icons/hi';
import { FiClock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { PostInterface } from '../../api/reduxTypes';

interface PostsState {
  posts:{ posts: PostInterface[];}
}

export const Read = () => {
  const blogs = useSelector((state: PostsState) => state?.posts.posts);



  return (
    <section className='read'>

      <div className='blogs'>

        <div className='category-list'>
          <Row />
        </div>

        {blogs.map(blog => <Blog {...blog} />)}

      </div>

      <hr className='line' />

      <div className='blogs-trends-container'>

        <div className='trending'>
          <h3 className='header-trending'>Trending <HiTrendingUp /></h3>
          {blogs.map((blog, i) => { if (i < 3) return <Trend {...blog} /> })}
        </div>

        <div className='trending'>
          <h3 className='header-trending'>Latest<FiClock /></h3>
          {blogs.map((blog, i) => { if (i < 3) return <Trend {...blog} /> })}
        </div>

      </div>

    </section>

  )
}
