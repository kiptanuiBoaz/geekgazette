import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Profile } from "./Profile";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
interface MiniProfileProps {
    scrollPos: number;
}

export const MiniProfile = ({ scrollPos }: MiniProfileProps) => {
    const { fname, avatarUrl } = useSelector((state: any) => state.auth.user);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const location = useLocation();
    const [route, setRoute] = useState<string>(location.pathname);

    useEffect(() => {
        if (location.pathname.startsWith('/edit/')) setShowProfile(false);
    }, [route])


    return (
        <>
            <img
                onClick={() => setShowProfile(!showProfile)}
                className="avatar"
                src={avatarUrl ?? "https://media.tenor.com/joLYNfFQGDgAAAAC/loading.gif"}
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
