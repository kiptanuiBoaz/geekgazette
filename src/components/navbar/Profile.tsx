import React, { useState } from "react";
import "./profile.scss";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri"
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import useLogOut from "../../hooks/useLogout";
interface ProfileProps {
    scrollPos: number;
}

export const Profile = ({ scrollPos }: ProfileProps) => {
    const { fname, avatarUrl, email, headTag, lname } = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();
    const logOut = useLogOut();
    const location = useLocation();

    const username = email.substring(0, email.indexOf('@'));
    const hasTestRoute = location.pathname.includes("/edit/");
    
    if(hasTestRoute) return <></>;

    const blogPostTitles = [
        'The Top 5 Strategies for Building a Successful Brand',
        '10 Tips for Mastering the Art of Time Management',
        'Why Emotional Intelligence is Critical for Leadership',
        'How to Create Compelling Content for Your Blog',
        'The Science of Happiness: Insights from Positive Psychology',
        'The Power of Networking: How to Build Stronger Connections',
        'The Benefits of Meditation: A Beginner\'s Guide',
        'The Art of Storytelling: How to Craft Captivating Narratives',
        'The Future of Work: Trends and Predictions for 2023',
        'The Secrets of High-Performing Teams: Lessons from Top Companies'
    ];

    return (
        <article style={{
            backgroundColor: scrollPos < 20 ? "#d1d2d2" : "#4d7e3e",

        }}
            className="profile"
        >
            <header className="profile-header">
                <img
                    className="main-avatar"
                    style={{ borderColor: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e" }}
                    src={
                        avatarUrl ??
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt={`${fname}'s profile`}
                />

                <h3 style={{ color: scrollPos > 20 ? "#d1d2d2" : "rgb(40, 97, 34)" }} className="names">{fname}{"  "}{lname}</h3>
                <p style={{ color: scrollPos > 20 ? "#a09d9d" : "#4d7e3e" }} className="email">{email}</p>
                <p className="head-tag">{headTag}</p>
            </header>
            <hr />


            <p className="blogs-title">My blog posts on geeek gazette</p>

            <main className="my-blogs">
                {blogPostTitles.map(title => {
                    return (
                        <div style={{ backgroundColor: scrollPos < 20 ? "#eeeee4" : " rgb(40, 97, 34)" }} className="my-blog">
                            <p style={{ color: scrollPos < 20 ? " rgb(40, 97, 34)" : " #a09d9d", }} className="title">{title.substring(0, 30)}...</p>
                            <p style={{ color: scrollPos < 20 ? "#4d7e3e" : "#6b6b6b", }} className="time">two days ago</p>
                        </div>
                    )
                })}
            </main>

            <footer className="buttons-container">
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#9b9999;" : "#4d7e3e"
                    }}
                    className="edit-btn"
                    onClick={()=>navigate(`/edit/${username}`)}
                >
                    Edit Profile <span className="edit-btn-span" > <FiEdit /></span>
                </button>
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e"
                    }}
                    className="sign-out-btn"
                    onClick={()=>{
                        logOut();
                        navigate("/auth/sign-in")
                    }
                    }
                >
                    Sign Out <span className="sign-out-btn-span"> <RiLogoutCircleRLine /></span>
                </button>
            </footer>
        </article>
    )
}
