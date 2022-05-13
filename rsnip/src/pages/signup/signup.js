import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./signupStyles.css";
import { FaUserAlt, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import SignUpImg from "../../assets/images/signup-img.svg";

const usernameRegex = /^[a-zA-Z]{2,}\d*$/;
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
  const [errors, setErrors] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmError: false,
  });

  const handleSignup = (evt) => {
    evt.preventDefault();
    if (validateSignup()) {
      console.log("There is errors");
    } else {
      try {
        Auth.signUp({
          username: username,
          email: email,
          password: password,
          attributes: {
            email: email,
            name: username,
          },
        })
          .then((res) => {
            navigate("../confirmation", { replace: true });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateSignup = () => {
    let hasError = false;
    if (!usernameRegex.test(username)) {
      setErrors((prev) => ({ ...prev, usernameError: true }));
      hasError = true;
    }
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, emailError: true }));
      hasError = true;
    }
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, passwordError: true }));
      hasError = true;
    }
    if (password !== confirmPassword || confirmPassword === "") {
      setErrors((prev) => ({ ...prev, confirmError: true }));
      hasError = true;
    }
    return hasError;
  };

  const validateInput = (e) => {
    if (usernameRegex.test(e.target.value)) {
      setErrors((prev) => ({ ...prev, usernameError: false }));
    }
    if (emailRegex.test(e.target.value)) {
      setErrors((prev) => ({ ...prev, emailError: false }));
    }
    if (passwordRegex.test(e.target.value)) {
      setErrors((prev) => ({ ...prev, passwordError: false }));
    }
    if (password === e.target.value && e.target.value !== "") {
      setErrors((prev) => ({ ...prev, confirmError: false }));
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
                  color={
                    errors.usernameError
                      ? "#CC0000"
                      : focus.username
                      ? "#41B883"
                      : "#777777"
                  }
                  size={16}
                />
              </div>
              <input
                className={
                  errors.usernameError
                    ? "login-signup-input error"
                    : "login-signup-input"
                }
                placeholder="Username"
                onFocus={() => onFocus("username")}
                onBlur={() => onBlur("username")}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateInput(e);
                }}
              ></input>
              {errors.usernameError ? (
                <div className="error-txt">
                  <ul>
                    <li>Must have at least 2 letters</li>
                    <li>Numbers are optional</li>
                    <li>No special characters</li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <div className="form-icon">
                <MdEmail
                  color={
                    errors.emailError
                      ? "#CC0000"
                      : focus.email
                      ? "#41B883"
                      : "#777777"
                  }
                  size={20}
                />
              </div>
              <input
                className={
                  errors.emailError
                    ? "login-signup-input error"
                    : "login-signup-input"
                }
                placeholder="Email"
                onFocus={() => onFocus("email")}
                onBlur={() => onBlur("email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateInput(e);
                }}
              ></input>
              {errors.emailError ? (
                <div className="error-txt">
                  <ul>
                    <li>Incorrect e-mail address</li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <div className="form-icon">
                <RiLockPasswordFill
                  color={
                    errors.passwordError
                      ? "#CC0000"
                      : focus.password
                      ? "#41B883"
                      : "#777777"
                  }
                  size={20}
                />
              </div>
              <input
                className={
                  errors.passwordError
                    ? "login-signup-input error"
                    : "login-signup-input"
                }
                placeholder="Password"
                type="password"
                onFocus={() => onFocus("password")}
                onBlur={() => onBlur("password")}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateInput(e);
                }}
              ></input>
              {errors.passwordError ? (
                <div className="error-txt">
                  <ul>
                    <li>Must have at least 8 characters</li>
                    <li>An uppercase and lowercase letter</li>
                    <li>A number and a special character</li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <div
                style={{ marginLeft: 2, marginTop: 2 }}
                className="form-icon"
              >
                <FaCheckCircle
                  color={
                    errors.confirmError
                      ? "#CC0000"
                      : focus.confirm
                      ? "#41B883"
                      : "#777777"
                  }
                  size={18}
                />
              </div>
              <input
                className={
                  errors.confirmError
                    ? "login-signup-input error"
                    : "login-signup-input"
                }
                placeholder="Confirm Password"
                type="password"
                onFocus={() => onFocus("confirm")}
                onBlur={() => onBlur("confirm")}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateInput(e);
                }}
              ></input>

              {errors.confirmError ? (
                <div className="error-txt">
                  <ul>
                    <li>Password does not match</li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="m-2"></div>
            <button className="light-shadow form-btn green-btn" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <img className="signup-img" src={SignUpImg} alt="SignUp Img" />
      </div>
      <div className="txt-center already-member">
        <Link to="/login">Already A Member</Link>
      </div>
    </div>
  );
};

export default SignUp;
