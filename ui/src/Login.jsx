import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const handleLogin = (event) => {
        event.push("/backlog");
        event.preventDefault();
    };

    return (
        <div className="container">
            <div className="login">
                <span>
                    <FontAwesomeIcon icon={faUser} className="icon-login" />
                </span>
                <h1>LOGIN FORM</h1>
                <form action="" className="form">
                    <label htmlFor="" className="label-login">
                        <span>
                            <FontAwesomeIcon
                                icon={faUserTie}
                                className="icon-form"
                            />
                        </span>
                        Username
                    </label>
                    <input
                        className="input-form"
                        type="text"
                        placeholder="vanlang2023"
                    />
                </form>
                <form action="" className="form">
                    <label htmlFor="" className="label-login">
                        <span>
                            <FontAwesomeIcon
                                icon={faKey}
                                className="icon-form"
                            />
                        </span>
                        Password
                    </label>
                    <input
                        className="input-form"
                        type="password"
                        placeholder="************"
                    />
                </form>
                <form action="/backlog" onClick={handleLogin}>
                    <input
                        className="submit-form"
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
