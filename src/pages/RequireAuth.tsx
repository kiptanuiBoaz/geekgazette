import { useLocation, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../api/authSlice";
import { setPrevUrl } from "../api/navSlice";


const RequireAuth = () => {
    const user = useSelector(selectUser);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reroute = () => {
        dispatch(setPrevUrl(location.pathname));
        return <Navigate to="/auth/sign-in"/>
    }

    return (user.email ? <Outlet /> : reroute());

}

export default RequireAuth;

// check if allowed roles in in the auth roles
// user?.roles?.find((role:any)=>allowedRoles.includes(role))