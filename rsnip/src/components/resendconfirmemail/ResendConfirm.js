import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./resendconfirm.css";
import { FaUserAlt } from "react-icons/fa";

function ResendConfirm() {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const reConfirmEmail = async (evt) => {
    evt.preventDefault();

    try {
      await Auth.resendSignUp(username);
      console.log("code resent to email");
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
      setSuccess(false);
      // console.log(error);
    }
  };

  return (
    <div className="resend-form">
      {isOpen ? (
        <form className="relative" onSubmit={(e) => reConfirmEmail(e)}>
          <div style={{ marginLeft: 2 }} className="form-icon">
            <FaUserAlt
              color={error ? "#CC0000" : focus ? "#41B883" : "#777777"}
              size={16}
            />
          </div>
          <input
            className={
              error ? "login-signup-input error" : "login-signup-input"
            }
            placeholder="Username"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          {error ? (
            <div className="error-txt txt-center">Invalid Username</div>
          ) : null}
          {success ? (
            <div className="success-txt txt-center">
              Email successfully sent!
            </div>
          ) : null}
          <div className="m-2"></div>
          <button className="light-shadow form-btn green-btn" type="submit">
            Resend Email
          </button>
        </form>
      ) : (
        <div className="row-center txt-center">
          <div className="dark-secondary-text">Have not recieved an email?&nbsp;</div>
          <div onClick={() => setIsOpen(true)} className="click-here-btn">
            Click Here
          </div>
        </div>
      )}
    </div>
  );
}

export default ResendConfirm;
