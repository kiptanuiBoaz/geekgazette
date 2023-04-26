import { useState, useEffect, useRef, ChangeEvent } from "react";
import logo from "../assets/navbar/logo-no-bg-green.png";
import "./login-form.scss";
import { Link } from "react-router-dom";
import { TogglePwdShow } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { api } from "../axios/axios";
import { useDispatch } from "react-redux";
import { updateAuth } from "../api/authSlice";

const LOGIN_URL = "/login";


const LoginForm = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const from = location?.state?.from?.pathname || "/";

    const errRef = useRef<HTMLElement>();

    const [email, setEmail] = useLocalStorage("email", '');
    const [accessToken,setAccessToken] = useLocalStorage("accessToken",'');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [persist, setPersist] = useState<boolean>(false);

    const handleSubmit = async () => {
        console.log(email, pwd);
        setLoading(true);
        try {
            const response = await api.post(
                LOGIN_URL,
                JSON.stringify({ email, pwd }),
            );
            console.log(response)
            if (response.status === 200) {
                const user = { ...response?.data?._doc, }
                const accessToken = response.data.accessToken;
                dispatch(updateAuth({ ...user, accessToken }));
                console.log(accessToken)
                setAccessToken(accessToken);
                navigate(from, { replace: true });
            } else {
                setEmail("");
                setPasswordVisibility(false);
                setPwd("");
            }

        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Password is incorrect');
            } else {
                setErrMsg('Login Failed');
            }
            //focus for screen readers
            errRef?.current?.focus();

            setPwd(""); setEmail("");
        }
        setLoading(false);

    }

    //focus on the user when the component loads 
    useEffect(() => { emailRef.current?.focus(); }, [])

    return (
        <section className="form-container">

            <img className="logo" src={logo} alt="logo" />

            <form className="login-form">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="email"
                    type="text"
                    placeholder="Enter email address"
                    ref={emailRef}
                    value={email}
                    required
                />

                <br />
                <input
                    onChange={(e) => setPwd(e.target.value)}
                    className="password"
                    value={pwd}
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="off"
                />

                <div className="toggle-password-visibility" onClick={() => setPasswordVisibility(!passwordVisibility)}  >
                    <TogglePwdShow passwordVisibility={passwordVisibility} />
                </div>

                <button
                    onClick={(e) => {
                        handleSubmit();
                        e.preventDefault();
                    }}
                    type="submit"
                    className="login-button"
                    disabled={email == "" && pwd == ""}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="checkbox-container">
                    <label className="checkbox-label">Remember me?</label>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            checked={persist}
                            onChange={() => setPersist(!persist)}
                        />
                    </div>
                </div>
                {errMsg && <p className="err-msg">{errMsg}</p>}
            </form>

            <div className="sign-up-link">
                <p className="sign-up-text">New here? Go to <Link to="/auth/sign-up">Sign-up</Link></p>
            </div>

        </section>
    )
}
export default LoginForm;