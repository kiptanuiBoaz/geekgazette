import logo from "../assets/navbar/logo-no-bg-green.png";
import "./login-form.scss"

export const LoginForm = () => {
    return (
        <section className='login-container'>
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
                        type="password"
                        placeholder="Enter your password"
                    />
                </form>
            </div>


        </section>
    )
}
