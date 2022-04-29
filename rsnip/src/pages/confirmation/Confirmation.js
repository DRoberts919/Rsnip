import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./confirmationStyle.css";
import ResendConfirm from "../../components/resendconfirmemail/ResendConfirm.js";
import { Auth } from "aws-amplify";
import { FaUserAlt } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

function Confirmation() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [focus, setFocus] = useState({
    username: false,
    pin: false,
  });
  const onFocus = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: true }));
  };
  const onBlur = (inputName) => {
    setFocus((prev) => ({ ...prev, [inputName]: false }));
  };
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
              <MdPassword color={focus.pin ? "#41B883" : "#777777"} size={20} />
            </div>
            <input
              className="login-signup-input"
              placeholder="Pin"
              onFocus={() => onFocus("pin")}
              onBlur={() => onBlur("pin")}
              onChange={(e) => setPin(e.target.value)}
            ></input>
          </div>
          <div className="m-2"></div>
          <button className="light-shadow form-btn green-btn" type="submit">
            Confirm Account
          </button>
        </form>
      </div>
      <div className="m-2"></div>
      <ResendConfirm />
    </div>
  );
}

export default Confirmation;
