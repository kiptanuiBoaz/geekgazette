import React from 'react';
import "./author-profile.scss";

interface UserProps {
    avatar: string;
    lname: string;
    fname:string;
}

export const AuthorProfile = ({ avatar, lname,fname }: UserProps) => {
    return (
        <div className='user-profile'>
            <img className='user-image' src={avatar} alt={fname} />
            <h4 className='username'>{fname}{" "}{lname}</h4>
            <p className='head-tag'>{`Systems Engineer`}</p>
        </div>
    )
}
        