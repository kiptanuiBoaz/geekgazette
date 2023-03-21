import { useState } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./sign-up-form.scss";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi"

export const SignUpForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  return (
    <section className="sign-up-form-container">

      <img className="logo" src={logo} alt="logo" />

      <form className="login-form" style={{"paddingTop":"25px"}}>
        <input
          className="email"
          type="text"
          placeholder="Enter email address"
        />

        <br />

        <input
          className="password"
          type= "password"
          placeholder="Enter your password"
          autoComplete="off"
        />

        <input
          className="password"
          type={passwordVisibility ? "text" : "password"}
          placeholder="Confirm your password"
          autoComplete="off"
        />

        <div
          className="sign-up-toggle-password-visibility"
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {passwordVisibility
            ? <div className="show">  <BiShow /> </div>
            : <div className="hide">  <BiHide /> </div>
          }
        </div>

        <button type="submit" className="login-button">Sign Up</button>

      </form>
      <div className="sign-up-link">
        <p className="sign-up-text">Already have an account? Go to <Link to="/auth/sign-in">Sign-In</Link></p>
      </div>

    </section>
  )
}
