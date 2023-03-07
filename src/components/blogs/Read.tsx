import React from 'react';
import "./read.scss";

export const Read = () => {
  const categories = [
    "All",
    "Culture",
     "Politics",
    "Technology",
    "Business",
    "Finance",
    "Food and drink",
    "Podcast",
    "Sports",
    "Spirituality",
    "Music",
  ]

  const categoryElements = categories.map(
    cat => <li className="category">{cat}</li>
  )


  return (
    <section className='read'>
      <ul className='category-list'>
        {categoryElements}
      </ul>

      <div className='blogs-trends-container'>

        <div className='blogs'>
<p>blogs</p>
        </div>
        <hr/>
        <div className='trends'>
<p>trends</p>
        </div>
      </div>

    </section>

  )
}
