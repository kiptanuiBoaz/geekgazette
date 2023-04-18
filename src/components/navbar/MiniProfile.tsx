import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Profile } from "./Profile";
import { useSelector } from "react-redux";

interface MiniProfileProps {
    scrollPos: number;
}

export const MiniProfile = ({ scrollPos }: MiniProfileProps) => {
    const { fname, avatarUrl } = useSelector((state: any) => state.auth.user);
    const [showProfile, setShowProfile] = useState<boolean>(false);


    return (
        <>
            <img
                onClick={() => setShowProfile(!showProfile)}
                className="avatar"
                src={avatarUrl ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
            />
            <p onClick={() => setShowProfile(!showProfile)} className="username">{fname} </p>
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
