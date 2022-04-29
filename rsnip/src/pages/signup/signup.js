import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./signupStyles.css";
import { FaUserAlt, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import SignUpImg from "../../assets/images/signup-img.svg";

const SignUp = () => {
  const navigate = useNavigate();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [focus, setFocus] = useState({
    username: false,
    email: false,
    password: false,
    confirm: false,
  });

  const handleSignup = (evt) => {
    evt.preventDefault();

    // Regex

    try {
      Auth.signUp({
        username: username,
        email: email,
        password: password,
        attributes: {
          email: email,
          name: username,
        },
      }).then((res) => {
        navigate("../confirmation", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFocus = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: true }));
  };
  const onBlur = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: false }));
  };

  return (
    <div className="signup">
      <div className="relative">
        <div className="signup-form light-shadow">
          <div className="form-title">Sign Up</div>
          <form onSubmit={(e) => handleSignup(e)}>
            <div className="relative">
              <div style={{ marginLeft: 2 }} className="form-icon">
                <FaUserAlt
                  color={focus.username ? "#41B883" : "#777777"}
                  size={16}
                />
              </div>
              <input
                className="login-signup-input"
                placeholder="Username"
                onFocus={() => onFocus("username")}
                onBlur={() => onBlur("username")}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="relative">
              <div className="form-icon">
                <MdEmail
                  color={focus.email ? "#41B883" : "#777777"}
                  size={20}
                />
              </div>
              <input
                className="login-signup-input"
                placeholder="Email"
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
            <div className="relative">
              <div
                style={{ marginLeft: 2, marginTop: 2 }}
                className="form-icon"
              >
                <FaCheckCircle
                  color={focus.confirm ? "#41B883" : "#777777"}
                  size={18}
                />
              </div>
              <input
                className="login-signup-input"
                placeholder="Confirm Password"
                type="password"
                onFocus={() => onFocus("confirm")}
                onBlur={() => onBlur("confirm")}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="m-2"></div>
            <button className="light-shadow form-btn green-btn" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <img className="signup-img" src={SignUpImg} alt="SignUp Img" />
      </div>
    </div>
  );
};

export default SignUp;
