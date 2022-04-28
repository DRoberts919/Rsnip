import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./signupStyles.css";
import UserIcon from "../../assets/images/form-user-icon.png";

const SignUp = () => {
  const navigate = useNavigate();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = (evt) => {
    evt.preventDefault();
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
        // console.log(res);
        navigate("../confirmation", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content signup">
      <div className="signup-form light-shadow">
        <div className="form-title">Sign Up</div>
        <form onSubmit={(e) => handleSignup(e)}>
          <div className="relative">
            <img className="form-icon" src={UserIcon} alt="User Icon" />
            <input
              className="login-signup-input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="relative">
            <img className="form-icon" src={UserIcon} alt="User Icon" />
            <input
              className="login-signup-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="relative">
            <img className="form-icon" src={UserIcon} alt="User Icon" />
            <input
              className="login-signup-input"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="relative">
            <img className="form-icon" src={UserIcon} alt="User Icon" />
            <input
              className="login-signup-input"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div className="m-2"></div>
          <button className="light-shadow form-btn green-btn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
