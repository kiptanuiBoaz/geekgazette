import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectOpenProfile } from "../../api/navSlice";
import { selectUser } from "../../api/authSlice";


export const MiniProfile = () => {
    const { fname, avatarUrl } = useSelector(selectUser);
    const openProfile = useSelector(selectOpenProfile);

    return (
        <>
            <img
                className="avatar"
                src={avatarUrl ?? "https://media.tenor.com/joLYNfFQGDgAAAAC/loading.gif"}
            />
            <p className="username">{fname} </p>
            <div className="expand-icon">
                {openProfile ? <MdExpandLess /> : <MdExpandMore />}
            </div>


        </>
    )
}
