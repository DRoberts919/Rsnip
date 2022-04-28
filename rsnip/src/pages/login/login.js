import { useState } from "react";
import { Auth } from "aws-amplify";
import { Navigate, useNavigate } from "react-router-dom";
import "./loginStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="content login">
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          placeholder="Email / Username"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">LOGIN</button>
      </form>

      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Login;
