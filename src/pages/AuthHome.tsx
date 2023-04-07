import "./auth-home.scss";
import { Outlet } from 'react-router-dom';

 const AuthHome = () => {
  return (
    <section className='auth-home'>
      <div className="container-left"></div>
      <div className="container-right"></div>
      <Outlet/>
    </section>
  )
}
export default AuthHome;