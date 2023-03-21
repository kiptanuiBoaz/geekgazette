import { useState } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./login-form.scss";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi"

export const LoginForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    return (
        <section className='login-container'>
            <div className="container-left"></div>
            <div className="container-right"></div>

            <div className="form-container">
                <img className="logo" src={logo} alt="logo" />

                <form className="login-form">
                    <input
                        className="email"
                        type="text"
                        placeholder="Enter email address"
                    />

                    <br />
                    <input
                        className="password"
                        type= {passwordVisibility ? "password" : "text"}
                        placeholder="Enter your password"
                        autoComplete="off"
                    />

                    <div
                        className="toggle-password-visibility"
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                        {!passwordVisibility
                            ? <div className="show">  <BiShow /> </div>
                            : <div className="hide">  <BiHide /> </div>
                        }
                    </div>

                    <button type="submit" className="login-button">Sign In</button>
                    
                </form>
                <div className="sign-up-link">
                        <p className="sign-up-text">New here? Go to <Link to="/sign-up">Sign-up</Link></p>
                    </div>
            </div>



        </section>
    )
}
