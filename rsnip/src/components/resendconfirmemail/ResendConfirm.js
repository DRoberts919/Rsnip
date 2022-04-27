import React, { useState } from "react";
import { Auth } from "aws-amplify";

function ResendConfirm() {
  const [username, setUsername] = useState("");

  const reConfirmEmail = async (evt) => {
    evt.preventDefault();

    try {
      await Auth.resendSignUp(username);
      console.log("code resent to email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => reConfirmEmail(e)}>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}></input>
        <button type='submit'>Resend Email</button>
      </form>
    </div>
  );
}

export default ResendConfirm;
