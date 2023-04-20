import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = () => {
    const user = useSelector((state: any) => state.auth.user);
    const location = useLocation();

    return (user.email
        ? <Outlet /> //render children
        : <Navigate to="/auth/sign-in" state={{ from: location }} replace /> //navigate to login
    );

}

export default RequireAuth;

// check if allowed roles in in the auth roles
// user?.roles?.find((role:any)=>allowedRoles.includes(role))