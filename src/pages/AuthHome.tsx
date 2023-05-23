import "./auth-home.scss";
import { Outlet } from 'react-router-dom';
import {Link} from "react-router-dom";
import {FaHome} from "react-icons/fa";

 const AuthHome = () => {
  return (
    <section className='auth-home'>
      <div className="homebtn">  <Link  to="/">Home<FaHome/></Link></div>
      <div className="container-left"></div>
      <div className="container-right"></div>
      <Outlet/>
    </section>
  )
}
export default AuthHome;