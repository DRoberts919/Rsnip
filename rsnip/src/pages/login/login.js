import { useState } from "react";
import { Auth } from "aws-amplify";
import { Navigate, useNavigate } from "react-router-dom";
import "./loginStyles.css";
import LoginImg from "../../assets/images/login-img.svg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const onFocus = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: true }));
  };
  const onBlur = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: false }));
  };

  const navigate = useNavigate();

  const handleLogin = (evt) => {
    evt.preventDefault();
    try {
      Auth.signIn(email, password).then((res) => {
        console.log(res);
      });
      navigate("/", { replace: true });
      //signInUserSession.accessToken.jwtToken
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="relative">
        <div className="login-form light-shadow">
          <div className="form-title">Login</div>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="relative">
              <div className="form-icon">
                <MdEmail
                  color={focus.email ? "#41B883" : "#777777"}
                  size={20}
                />
              </div>
              <input
                className="login-signup-input"
                placeholder="Email/Username"
                onFocus={() => onFocus("email")}
                onBlur={() => onBlur("email")}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="relative">
              <div className="form-icon">
                <RiLockPasswordFill
                  color={focus.password ? "#41B883" : "#777777"}
                  size={20}
                />
              </div>
              <input
                className="login-signup-input"
                placeholder="Password"
                type="password"
                onFocus={() => onFocus("password")}
                onBlur={() => onBlur("password")}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="m-2"></div>
            <button className="light-shadow form-btn green-btn" type="submit">
              Login
            </button>
          </form>
          {/* <div>
            <button onClick={() => logout()}>Logout</button>
          </div> */}
        </div>
        <img className="login-img" src={LoginImg} alt="Login Img" />
      </div>
    </div>
  );
};

export default Login;
