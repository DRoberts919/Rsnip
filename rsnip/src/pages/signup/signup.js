import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "@aws-amplify/ui-react/styles.css";

import "./signupStyles.css";

const SignUp = () => {
  const navigate = useNavigate();

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = (evt) => {
    evt.preventDefault();
    try {
      Auth.signUp({
        username: "philip",
        email: "droberts@student.neumont.edu",
        password: "philipD123!",
        attributes: {
          email: "droberts@student.neumont.edu",
          name: "philip",
          username: "philip",
        },
      }).then((res) => {
        console.log(res);
        navigate("../confirmation", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='content signup'>
      <form onSubmit={(e) => handleSignup(e)}>
        <input placeholder='Username'></input>
        <input placeholder='Password'></input>
        <input placeholder='Confirm Password'></input>
        <input placeholder='Email'></input>
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
