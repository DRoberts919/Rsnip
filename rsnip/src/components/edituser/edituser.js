import React, { useState } from "react";
import { Auth } from "aws-amplify";

function edituser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const submitEdit = async (event) => {
    event.preventDefault();

    // get your current session from Auth.currentAuthenticatedUser()
    let user = await Auth.currentAuthenticatedUser();

    // update users info for congito;
    let result = await Auth.updateUserAttributes(user, {
      email: email,
      name: username,
    });

    console.log(result);
  };

  return <div>edituser</div>;
}

export default edituser;
