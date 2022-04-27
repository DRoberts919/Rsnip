import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./confirmationStyle.css";

import { Auth } from "aws-amplify";

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
    <div className='confirm'>
      <form onSubmit={(e) => handleConfirm(e)}>
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}></input>
        <input
          placeholder='pin'
          onChange={(e) => setPin(e.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Confirmation;
