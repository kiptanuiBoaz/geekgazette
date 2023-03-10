import React from 'react';
import "./read.scss";
import { Row } from "./Row";
import { Blog } from "../../components/index";

export const Read = () => {
  const blogs = [
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, lectus id ornare suscipit, velit velit viverra ante, nec dignissim justo metus id nibh. Praesent commodo nunc sit amet nisi interdum ultricies. Fusce commodo, libero eu pulvinar malesuada, tellus tortor suscipit metus, vel ornare purus justo quis elit. Suspendisse porttitor magna nec tortor mollis, eget commodo mauris interdum. In faucibus velit non dui malesuada aliquam. Praesent faucibus, tortor nec viverra commodo, lectus dolor euismod dolor, eu aliquam magna ipsum vitae nulla. Vivamus eu justo at quam vehicula placerat. Sed eget odio vitae velit auctor consequat. Suspendisse aliquam, justo non eleifend efficitur, nisl magna faucibus dolor, in tincidunt turpis arcu vel felis. Aliquam tincidunt justo euismod lacus consectetur, at cursus ante vehicula. Nunc rutrum dolor nec diam egestas, id lacinia odio tempor. Phasellus imperdiet lacinia lectus, vitae placerat eros lobortis sed. Sed vel tincidunt metus, a lacinia mauris.",
      title: "The current state of the system",
      image: "https://images.unsplash.com/photo-1678436749354-8dce394a3693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      avatar: "https://images.unsplash.com/photo-1678462172400-74d993672630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      username: "John Doe",
      date: "Yestereday",
      category: "technology"
    },
  ]

  return (
    <section className='read'>
      <ul className='category-list'>
        <Row />
      </ul>

      <div className='blogs-trends-container'>

        <div className='blogs'>
          {blogs.map(blog => <Blog {...blog} />)}
        </div>
        <hr />
        <div className='trends'>
          <p>trends</p>
        </div>
      </div>

    </section>

  )
}
