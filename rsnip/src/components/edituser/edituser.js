import React, { useState } from "react";
import { Auth } from "aws-amplify";

function EditUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const submitEdit = async (event) => {
    event.preventDefault();

    try {
      // get your current session from Auth.currentAuthenticatedUser()
      let user = await Auth.currentAuthenticatedUser();

      // update users info for congito;
      let result = await Auth.updateUserAttributes(user, {
        email: email,
        name: username,
      });
      console.log(result); // SUCCESS

      if (result === "SUCCESS") {
        // update user Data in the dynamoDB User-Table
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>edituser</div>;
}

export default EditUser;
