import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Profile } from "./Profile";

interface MiniProfileProps {
    scrollPos: number;
}

export const MiniProfile = ({ scrollPos }: MiniProfileProps) => {
    const [username, setUsername] = useState<string>("Boaz");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [showProfile, setShowProfile] = useState<boolean>(false);


    return (
        <>
            <img
                onClick={() => setShowProfile(!showProfile)}
                className="avatar"
                src={avatar ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
            />
            <p onClick={() => setShowProfile(!showProfile)} className="username">{` ${username}`} </p>
            <div
                onClick={() => setShowProfile(!showProfile)}
                className="expand-icon"
            >
                {showProfile ? <MdExpandLess /> : <MdExpandMore />}
            </div>

            {showProfile && <Profile scrollPos={scrollPos} />}
        </>
    )
}
