import { useState, useEffect, useRef } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./login-form.scss";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi"

export const LoginForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);

    //focus on the user when the component loads 
    useEffect(() => {
        emailRef.current?.focus();

    }, [])//only runs ounce

    return (
        <section className="form-container">

            <img className="logo" src={logo} alt="logo" />

            <form className="login-form">
                <input
                    className="email"
                    type="text"
                    placeholder="Enter email address"
                    ref={emailRef}
                    required
                />

                <br />
                <input
                    className="password"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="off"
                />

                <div
                    className="toggle-password-visibility"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                    {passwordVisibility
                        ? <div className="show">  <BiShow /> </div>
                        : <div className="hide">  <BiHide /> </div>
                    }
                </div>

                <button type="submit" className="login-button">Sign In</button>

            </form>
            <div className="sign-up-link">
                <p className="sign-up-text">New here? Go to <Link to="/auth/sign-up">Sign-up</Link></p>
            </div>

        </section>
    )
}
