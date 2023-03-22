import { useState, useEffect, useRef } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./sign-up-form.scss";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { BsInfoCircle, BsCheck2Circle } from "react-icons/bs";

const ATLEAST_ONE_SPECIAL_CHARACTER_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
const LOWER_AND_UPPER_CHARACTER_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).+$/
const ATLEAST_ONE_NUMBER_REGEX = /\d/
const NUM_8_TO_24_CHARACTERS_REGEX = /^.{8,24}$/

const AN_AT_SYMBOL_REGEX = /@/
const NO_SPECIAL_CHARACTERS_EXCEPT_FOR_DOT_UNDERSCORE_REGEX = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
const START_WITH_A_LETTER_OR_NUMBER_AND_DOT_AND_DASH_REGEX = /^[0-9a-zA-Z]/
const CONTAIN_DOMAIN_EXTENSION_REGEX = /\.[A-Za-z]{2,}$/


export const SignUpForm = () => {

  //password states
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [charactersNumValid, setCharactersNumValid] = useState<boolean>(false);
  const [upperAndLowerValid, setUpperAndLowerValid] = useState<boolean>(false);
  const [numberValid, setNumberValid] = useState<boolean>(false);
  const [specialCharactersValid, setSpecialCharactersValid] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  //email states 
  const [email, setEmail] = useState<string>("");
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [atSymbolValid, setAtSymbolValid] = useState<boolean>(false);
  const [noSpecialCharacters, setNoSpecialCharacters] = useState<boolean>(false);
  const [startsWithLetter, setStartsWithLetter] = useState<boolean>(false);
  const [containsDomainExtension, setContainsDomainExtension] = useState<boolean>(false);

  //pwd match field states
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  //focus on the email when the component loads //only runs ounce
  useEffect(() => { emailRef.current?.focus(); }, [])

  //validatet the password
  useEffect(() => {
    setCharactersNumValid(NUM_8_TO_24_CHARACTERS_REGEX.test(password));
    setUpperAndLowerValid(LOWER_AND_UPPER_CHARACTER_REGEX.test(password));
    setNumberValid(ATLEAST_ONE_NUMBER_REGEX.test(password));
    setSpecialCharactersValid(ATLEAST_ONE_SPECIAL_CHARACTER_REGEX.test(password));
    setPasswordValid((charactersNumValid && upperAndLowerValid && numberValid && specialCharactersValid) ? true : false);
    setValidMatch(password === confirmPassword);

  }, [password, confirmPassword]);

  //validate email
  useEffect(() => {
    setAtSymbolValid(AN_AT_SYMBOL_REGEX.test(email));
    setNoSpecialCharacters(NO_SPECIAL_CHARACTERS_EXCEPT_FOR_DOT_UNDERSCORE_REGEX.test(email));
    setStartsWithLetter(START_WITH_A_LETTER_OR_NUMBER_AND_DOT_AND_DASH_REGEX.test(email));
    setContainsDomainExtension(CONTAIN_DOMAIN_EXTENSION_REGEX.test(email));
    setValidEmail((atSymbolValid && noSpecialCharacters && containsDomainExtension && startsWithLetter) ? true : false);
  }, [email])

  //validate email
  useEffect(() => {
  }, [email])

  const errmsg =
    [{
      variable: atSymbolValid,
      p: "an at symbol valid"
    },
    {
      variable: startsWithLetter,
      p: "starts with letter"
    }].map(({ variable, p }: any): any => {
      return <p style={{ "color": variable ? "#4d7e3e" : "#9e9d9d" }}>
        {variable ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
        {p}
      </p>
    })

  // console.log(upperAndLowerValid)
  return (
    <section className="sign-up-form-container">

      <img className="logo" src={logo} alt="logo" />

      <form className="sign-up-form" style={{ "paddingTop": "25px" }}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          type="text"
          value={email}
          className="sign-up-email"
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
          onChange={(e) => setConfirmPassowrd(e.target.value)}
          onFocus={() => setConfirmFocus(true)}
          onBlur={() => setConfirmFocus(false)}
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
     
        {/* password validation */}
        {passwordFocus && !passwordValid && password !== "" &&
          <div className="validation" >
            <p className="identifier"> Password must contain: </p>

            <p style={{ "color": charactersNumValid ? "#4d7e3e" : "#9e9d9d" }}>
              {charactersNumValid ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              8 to 24 characters
            </p>
            <p style={{ "color": upperAndLowerValid ? "#4d7e3e" : "#9e9d9d" }}>
              {upperAndLowerValid ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              Uppercase and lowercase letters [A-Z,a-z]
            </p>
            <p style={{ "color": numberValid ? "#4d7e3e" : "#9e9d9d" }}>
              {numberValid ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              Aleast one number [0-9]
            </p>
            <p style={{ "color": specialCharactersValid ? "#4d7e3e" : "#9e9d9d" }}>
              {specialCharactersValid ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              Atleast one special character [@,#.*,&,%...]
            </p>
          </div>
        }


        {/* email validation */}
        {emailFocus && !validEmail && email !== "" &&
          <div className="validation">
            <p className="identifier">Email address must contain:</p>
   {errmsg}
            {/* <p style={{ "color": atSymbolValid ? "#4d7e3e" : "#9e9d9d" }}>
              {atSymbolValid ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              An "@" symbol
            </p>
            <p style={{ "color": noSpecialCharacters ? "#4d7e3e" : "#9e9d9d" }}>
              {noSpecialCharacters ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              No special characters except for "." and "_"
            </p>
            <p style={{ "color": startsWithLetter ? "#4d7e3e" : "#9e9d9d" }}>
              {startsWithLetter ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              Start with a letter or number
            </p>
            <p style={{ "color": containsDomainExtension ? "#4d7e3e" : "#9e9d9d" }}>
              {containsDomainExtension ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              A domain name extension (e.g. ".com,.org etc.)
            </p> */}
          </div>
         
        }

        {/* match password validation */}
        {confirmFocus && !validEmail && confirmPassword !== "" &&
          <div className="validation">
            <p className="identifier">Password must:</p>
            <p style={{ "color": validMatch ? "#4d7e3e" : "#9e9d9d" }}>
              {validMatch ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
              Match the first password input field
            </p>
          </div>

        }

      </form>

      <div className="sign-up-link">
        <p className="sign-up-text">Already have an account? Go to <Link to="/auth/sign-in">Sign-In</Link></p>
      </div>

    </section>
  )
}
