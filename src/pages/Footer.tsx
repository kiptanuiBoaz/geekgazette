import React, { useState } from 'react';
import "./footer.scss";
import { Link } from "react-router-dom";
import { FiExternalLink } from 'react-icons/fi';
import { FaCode, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiTrendingUp } from "react-icons/hi";
import logo from "../assets/navbar/geek-gazette-high-resolution-logo-white-on-transparent-background.png";
import { useSelector } from 'react-redux';
import { PostInterface } from '../api/reduxTypes';

interface PostsState {
  posts: { posts: PostInterface[]; }
}

const Footer = () => {
  const [hoverd, setHovered] = useState<number>(-1);
  const blogs = useSelector((state: PostsState) => state?.posts.posts);

  const categories = blogs.reduce((counts: any, blog: PostInterface) => {
    counts[blog.category] = (counts[blog.category] || 0) + 1;
    return counts;
  }, {});

  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);


  return (
    <footer className='footer'>
      <div className='top'>
        <div className='company'>
          <Link to="/" ><img src={logo} alt="logo" /></Link>
          <p>Where geeks come to get their fix</p>
          <a href='https://github.com/kiptanuiBoaz/geekgazette' target='_blank'>Source code <FaCode /></a>
        </div>

        <div className='developer'>
          <h5>About the developer</h5>
          <a href="https://github.com/kiptanuiBoaz" target='_blank'> <BsGithub /> {" "} GitHub</a>
          <a href='#'><CgProfile /> {" "} Portfolio</a>
          <a href='https://twitter.com/k_boazo' target='_blank'> <FaTwitter /> {" "} Twitter</a>
          <a href='https://www.linkedin.com/in/kiptanui-boaz-466154217/'target='_blank'> <FaLinkedin /> {" "} LinkedIn</a>
        </div>

        <div className='privacy'>
          <h5>Privacy</h5>
          <a href='#'>Terms {" "}<FiExternalLink /></a>
          <Link to="/about">About {" "}<FiExternalLink /></Link>
          <Link to="blog/write">Write {" "}<FiExternalLink /></Link>
        </div>

        <div className='categories'>
          <h5>Porpular categories</h5>
          {sortedCategories?.slice(0,4)?.map((cat, i) =>
            <p onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)} key={cat}>
              <Link to={cat} >
                {cat} {hoverd === i && <HiTrendingUp />}
              </Link>
            </p>)}
        </div >

      </div>
      <div className='bottom'>
        <p>Copyright &copy; {new Date().getFullYear()} <b>geekgazette</b>{" "}</p>
      </div>

    </footer>
  )
}

export default Footer;
