import React, { useState } from "react";
import "./confirmationStyle.css";

import { Auth } from "aws-amplify";

function Confirmation() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pin);

    try {
      await Auth.confirmSignUp(email, pin).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='confirm'>
      <form onSubmit={(e) => handleConfirm(e)}>
        <input
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}></input>
        <input
          placeholder='pin'
          onChange={(e) => setPin(e.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Confirmation;
