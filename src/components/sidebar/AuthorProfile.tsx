import React from 'react';
import "./author-profile.scss";

interface UserProps {
    avatarUrl: string;
    lname: string;
    fname:string;
    headTag: string;
}

export const AuthorProfile = ({ avatarUrl,headTag, lname,fname }: UserProps) => {

    React.useEffect(()=>{},[ avatarUrl,headTag, lname,fname ]);

    return (
        <div className='user-profile'>
            <img className='user-image' src={avatarUrl} alt={fname} />
            <h4 className='username'>{fname}{" "}{lname}</h4>
            <p className='head-tag'>{headTag}</p>
        </div>
    )
}
        