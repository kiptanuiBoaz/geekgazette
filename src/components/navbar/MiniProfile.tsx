import { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Profile } from "./Profile";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
interface MiniProfileProps {
    scrollPos: number;
    showProfile: boolean;
}

export const MiniProfile = ({ scrollPos,showProfile }: MiniProfileProps) => {
    const { fname, avatarUrl } = useSelector((state: any) => state.auth.user);

    return (
        <>
            <img
                className="avatar"
                src={avatarUrl ?? "https://media.tenor.com/joLYNfFQGDgAAAAC/loading.gif"}
            />
            <p className="username">{fname} </p>
            <div className="expand-icon">
                {showProfile ? <MdExpandLess /> : <MdExpandMore />}
            </div>

            
        </>
    )
}
