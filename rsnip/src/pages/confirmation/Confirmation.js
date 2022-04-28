import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./confirmationStyle.css";
import ResendConfirm from "../../components/resendconfirmemail/ResendConfirm.js";
import { Auth } from "aws-amplify";
import UserIcon from "../../assets/images/form-user-icon.png";

function Confirmation() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(username, pin).then((res) => console.log(res));
      navigate("../login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content confirm">
      <div className="confirm-form light-shadow">
        <div className="confirm-title">Thank You For Signing Up!</div>
        <div className="m-b-1">
          Please check your email to confirm your account.
        </div>
        <form onSubmit={(e) => handleConfirm(e)}>
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
              placeholder="Pin #"
              onChange={(e) => setPin(e.target.value)}
            ></input>
          </div>
          <div className="m-2"></div>
          <button className="light-shadow form-btn green-btn" type="submit">
            Confirm Account
          </button>
        </form>
        <div className="m-2"></div>
        <div>Have not recieved an email?</div>
        <ResendConfirm />
      </div>
    </div>
  );
}

export default Confirmation;
