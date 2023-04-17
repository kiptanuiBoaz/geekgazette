import { useState, useEffect, useRef, ChangeEvent } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./sign-up-form.scss";
import { Link } from "react-router-dom";
import { ValidationMsgs, TogglePwdShow } from "../components";
import { emailRegex, pwdRegex } from "../utils/REGEX";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";
import { useDispatch } from "react-redux";
import { updateAuth } from "../api/authSlice";

const REGISTER_URL = "/register";

const SignUpForm = () => {

  const navigate = useNavigate();
  const {

    AN_AT_SYMBOL_REGEX,
    NO_SPECIAL_CHARACTERS_EXCEPT_FOR_DOT_UNDERSCORE_REGEX,
    START_WITH_A_LETTER_OR_NUMBER_AND_DOT_AND_DASH_REGEX,
    CONTAIN_DOMAIN_EXTENSION_REGEX
  } = emailRegex;

  const {
    NUM_8_TO_24_CHARACTERS_REGEX,
    LOWER_AND_UPPER_CHARACTER_REGEX,
    ATLEAST_ONE_NUMBER_REGEX,
    ATLEAST_ONE_SPECIAL_CHARACTER_REGEX
  } = pwdRegex;

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

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const errRef = useRef<HTMLElement>();
  const dispatch = useDispatch();

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


  const emailValidArray = [
    { variable: atSymbolValid, p: `An "@" symbol` },
    { variable: atSymbolValid, p: `No special characters except for "." and "_"` },
    { variable: startsWithLetter, p: `Start with a letter or number` },
    { variable: containsDomainExtension, p: `A domain name extension (e.g. ".com,.org etc.)` },
  ]

  const validPasswordArray = [
    { variable: charactersNumValid, p: `8 to 24 characters` },
    { variable: upperAndLowerValid, p: `Uppercase and lowercase letters [A-Z,a-z]` },
    { variable: numberValid, p: `Aleast one number [0-9]` },
    { variable: specialCharactersValid, p: `Atleast one special character [@,#.*,&,%...]` },
  ]

  const validMatchPasswordArray = [
    { variable: validMatch, p: " Match the first password input field" },
  ]

  const handleSubmit = async () => {
    console.log(email, password);

    setLoading(true)

    try {
      const response = await api.post(REGISTER_URL, JSON.stringify({ email, password }));
      console.log(response)

      if (response.status === 201) {
        setSuccess(true);
        dispatch(updateAuth({ email }));
        navigate("/auth/new-profile");
      }

    } catch (err: any) {
      //handle errors
      if (!err?.response) {
        setErrMsg('No Server Response');
        setLoading(false);
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef?.current?.focus();//for screen readers
    }
    setLoading(false);
  }


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
          value={confirmPassword}
          className="sign-up-password"
          type={passwordVisibility ? "text" : "password"}
          placeholder="Confirm your password"
          autoComplete="off"
        />

        <div className="sign-up-toggle-password-visibility" onClick={() => setPasswordVisibility(!passwordVisibility)}>
          <TogglePwdShow passwordVisibility={passwordVisibility} />
        </div>
        {/* () => navigate("/user/new-profile") */}
        <button
          onClick={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
          type="submit"
          className="login-button"
        >{loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* password validation */}
        {passwordFocus && !passwordValid && password !== "" &&
          <ValidationMsgs identifier="Password must contain" msgsArray={validPasswordArray} />
        }

        {/* email validation */}
        {emailFocus && !validEmail && email !== "" &&
          <ValidationMsgs identifier="Email address must contain" msgsArray={emailValidArray} />
        }

        {/* match password validation */}
        {confirmFocus && !validMatch && confirmPassword !== "" &&
          <ValidationMsgs identifier="Password must" msgsArray={validMatchPasswordArray} />
        }

      </form>

      <div className="sign-up-link">
        <p className="sign-up-text">Already have an account? Go to <Link to="/auth/sign-in">Sign-In</Link></p>
      </div>

    </section>
  )
}

export default SignUpForm;
