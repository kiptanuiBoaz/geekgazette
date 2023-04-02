import React from 'react';
import "./comment.scss";

export const Comment = () => {
    return (
        <article className='comment'>
            <header className='comment-header'>
                <img className='comment-avatar' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60' />
                <h6 className='comment-author-name'>John Doe</h6>
                <p className='comment-date'>3 days ago</p>
            </header>
            <main className='comment-body'>
                <p className='comment-content'>
                    great article, some info is pertaining to class components that are nowdays less used but the concepts are usefull.
                </p>
                {/* <hr/> */}
            </main>
          

        </article>
    )
}
