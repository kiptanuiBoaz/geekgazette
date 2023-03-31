import React, { useState } from "react";
import "./profile.scss";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri"

interface ProfileProps {
    scrollPos: number;
}

export const Profile = ({ scrollPos }: ProfileProps) => {
    const [fname, setFname] = useState<string>("Kiptanui");
    const [lname, setlName] = useState<string>("Boaz");
    const [img,] = useState<string | null>(null);
    const headTag = "Web Developer";
    const email = "boaserem022@gmail.com";

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

                        img ??
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt={`${fname}'s profile`}
                />

                <h3 style={{ color: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e" }} className="names">{fname}{"  "}{lname}</h3>
                <p className="email">{email}</p>
                <p className="head-tag">{headTag}</p>
            </header>
            <hr />


            <p className="blogs-title">My blog posts   <MdExpandMore /> <MdExpandLess /></p>

            <main className="my-blogs">
                {blogPostTitles.map(title => {
                    return (
                        <div className="my-blog">
                            <p className="title">{title.substring(0, 25)}...</p>
                            <p className="time">two days ago</p>
                        </div>
                    )
                })}
            </main>

            <footer className="buttons-container">
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e"
                    }}
                    className="edit-btn"
                >
                    Edit Profile <span className="edit-btn-span" > <FiEdit /></span>
                </button>
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e"
                    }}
                    className="sign-out-btn"
                >
                    Sign Out <span className="sign-out-btn-span"> <RiLogoutCircleRLine /></span>
                </button>
            </footer>
        </article>
    )
}
