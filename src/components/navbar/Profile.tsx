import "./profile.scss";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import useLogOut from "../../hooks/useLogout";
import { PostInterface } from "../../api/reduxTypes";
import TimeAgo from "../../utils/Timeago";
import { Confirm } from "notiflix";
import { ProfileProps } from "../../types/navbar-types/profileTypes";
import { selectUser } from "../../api/authSlice";
import { selectPosts } from "../../api/postsSlice";
import { setOpenProfile } from "../../api/navSlice";


export const Profile = ({ scrollPos }: ProfileProps) => {
    const { fname, avatarUrl, email, headTag, lname } = useSelector(selectUser);

    //logout fn from useLogout hook
    const logOut = useLogOut();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = email.substring(0, email.indexOf('@'));

    //current user's blog posts
    const currentUserBlogs = useSelector(selectPosts).filter(
        (blog: PostInterface) => blog.authorEmail === email
    );

    //closet the profile during profile edit
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
                <h3 style={{ color: scrollPos > 20 ? " #eeeee4 " : "rgb(40, 97, 34)" }} className="names">{fname}{"  "}{lname}</h3>
                <p style={{ color: scrollPos > 20 ? "#a09d9d" : "#4d7e3e" }} className="email">{email}</p>
                <p style={{ color: scrollPos > 20 ? "#d1d2d2" : "#6b6b6b", }} className="head-tag">{headTag}</p>
            </header>
            <hr />

            {currentUserBlogs.length > 0 && <p style={{ color: scrollPos > 20 ? " #eeeee4 " : "rgb(40, 97, 34)" }} className="blogs-title">My blog post(s) on geeek gazette</p>}

            <main className="my-blogs">
                {currentUserBlogs?.slice().reverse().map(({ title, date, _id: postId }) => {
                    return (
                        <div key={title} style={{ backgroundColor: scrollPos < 20 ? "#eeeee4" : " rgb(40, 97, 34)" }} className="my-blog">
                            <p
                                style={{ color: scrollPos < 20 ? " rgb(40, 97, 34)" : " #a09d9d", }}
                                className="title"
                                onClick={() => {
                                    dispatch(setOpenProfile(false));
                                    navigate(`/blog/read/${postId}`);
                                }}

                            >
                                {title.substring(0, 30)}...
                            </p>
                            <p style={{ color: scrollPos < 20 ? "#4d7e3e" : "#6b6b6b", }} className="time"><TimeAgo timestamp={date} /></p>
                        </div>
                    )
                })}
            </main>

            <footer className="buttons-container">
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#9b9999" : "#4d7e3e"
                    }}
                    className="edit-btn"
                    onClick={() => {
                        dispatch(setOpenProfile(false));
                        navigate(`/edit/${username}`);
                    }}
                >
                    Edit Profile   <FiEdit style={{ paddingLeft: "4px" }} />
                </button>
                <button
                    style={{
                        color: scrollPos > 20 ? "#6b6b6b" : "#4d7e3e",
                        borderColor: scrollPos > 20 ? "#d1d2d2" : "#4d7e3e"
                    }}
                    className="sign-out-btn"
                    onClick={() => {
                        Confirm.show(
                            'Want to Sign out?',
                            'You will be Signed Out of your account',
                            'Yes',
                            'No',
                            () => logOut() ,
                            () => dispatch(setOpenProfile(false)),
                            {
                                okButtonBackground: " #4d7e3e",
                                titleColor: "#4d7e3e",
                                borderRadius: "15px",
                                distance: "20px",
                                cssAnimationStyle: "zoom",
                                buttonsFontSize: "17px",
                                titleFontSize: "18px"
                            }
                        );

                    }}
                >
                    Sign out <RiLogoutCircleRLine style={{ paddingLeft: "4px" }} />
                </button>
            </footer>
        </article>
    )
}
