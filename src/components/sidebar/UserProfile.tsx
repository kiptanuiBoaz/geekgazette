import React from 'react';
import "./user-profile.scss";

interface UserProps {
    avatar: string;
    username: string;
}

export const UserProfile = ({ avatar, username }: UserProps) => {
    return (
        <div className='user-profile'>
            <img className='user-image' src={avatar} alt={username} />
            <h4 className='username'>{username}</h4>
            <p className='bio'>{`Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor,`}</p>
        </div>
    )
}
        