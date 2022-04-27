import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResendConfirm from "../../components/resendconfirmemail/ResendConfirm.js";
import "./signupStyles.css";

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
    <div className='content signup'>
      <form onSubmit={(e) => handleSignup(e)}>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}></input>
        <input
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}></input>
        <input
          placeholder='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}></input>
        <input
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}></input>
        <button type='submit'>Sign up</button>
      </form>
      <ResendConfirm />
    </div>
  );
};

export default SignUp;
