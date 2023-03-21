import { useState, useEffect, useRef } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./sign-up-form.scss";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";

const ATLEAST_ONE_SPECIAL_CHARACTER_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
const LOWER_AND_UPPER_CHARACTER_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).+$/
const ATLEAST_ONE_NUMBER_REGEX = /\d/
const NUM_8_TO_24_CHARACTERS_REGEX = /^.{8,24}$/


export const SignUpForm = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [charactersNumValid, setCharactersNumValid] = useState<boolean>(false);
  const [upperAndLowerValid, setUpperAndLowerValid] = useState<boolean>(false);
  const [numberValid, setNumberValid] = useState<boolean>(false);
  const [specialCharactersValid, setSpecialCharactersValid] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [passwordValid,setPasswordValid] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  //focus on the email when the component loads //only runs ounce
  useEffect(() => { emailRef.current?.focus(); }, [])

  //validatet the password
  useEffect(() => {
    setCharactersNumValid(NUM_8_TO_24_CHARACTERS_REGEX.test(password));
    setUpperAndLowerValid(LOWER_AND_UPPER_CHARACTER_REGEX.test(password));
    setNumberValid(ATLEAST_ONE_NUMBER_REGEX.test(password));
    setSpecialCharactersValid(ATLEAST_ONE_SPECIAL_CHARACTER_REGEX.test(password));
    if( charactersNumValid && upperAndLowerValid && !numberValid && specialCharactersValid ) setPasswordValid(true) 
  }, [password]);

  //validate email
  useEffect(() => {
  }, [email])
  // console.log(upperAndLowerValid)
  return (
    <section className="sign-up-form-container">

      <img className="logo" src={logo} alt="logo" />

      <form className="login-form" style={{ "paddingTop": "25px" }}>
        <input
          className="sign-up-email"
          type="text"
          placeholder="Enter email address"
          ref={emailRef}
        />

        <br />

        <input
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          value={password}
          className="sign-up-password"
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          required
        />

        <input
          className="sign-up-password"
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

        {passwordFocus && !passwordValid &&
          <div className="validation" >
            <p className="identifier"> Password must contain: </p>
            <p style={{ "color": charactersNumValid ? "#4d7e3e" : "#9e9d9d" }}> <BsInfoCircle /> 8 to 24 characters</p>
            <p style={{ "color": upperAndLowerValid ? "#4d7e3e" : "#9e9d9d" }}> <BsInfoCircle /> Uppercase and lowercase letters [A-Z,a-z]</p>
            <p style={{ "color": numberValid ? "#4d7e3e" : "#9e9d9d" }}> <BsInfoCircle /> Aleast one number [0-9]</p>
            <p style={{ "color": specialCharactersValid ? "#4d7e3e" : "#9e9d9d" }}> <BsInfoCircle /> Atleast one special character [@,#.*,&,%...]</p>
          </div>}

      </form>

      <div className="sign-up-link">
        <p className="sign-up-text">Already have an account? Go to <Link to="/auth/sign-in">Sign-In</Link></p>
      </div>

    </section>
  )
}
