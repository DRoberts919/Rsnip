import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

function Edituser() {
  const [email, setEmail] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [cognitoUser, setCognitoUser] = useState(null);

  useEffect(() => {
    try {
      // get your current session from Auth.currentAuthenticatedUser()
      let cognitoUser = Auth.currentAuthenticatedUser().then((data) => {
        console.log(data);
        setCognitoUser(() => data);
        fetch(`${process.env.REACT_APP_BASE_URL}user/${data.attributes.sub}`)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setUsername(res.Item.name);
            setEmail(res.Item.email);
            setGitHub(res.Item.gitHub);
            setLinkedIn(res.Item.linkedIn);
            setProfilePic(res.Item.profilePic);
            setUserData(() => res);
          });
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitEdit = async (event) => {
    event.preventDefault();

    // update users info for congito;
    if (cognitoUser !== null && userData !== null) {
      // UpdateUserAttribute will update the specific user within cognito
      let result = await Auth.updateUserAttributes(cognitoUser, {
        email: email,
        name: username,
      }).then((res) => {
        console.log(res);
        // if response is successfull then move on to updating dynamodb.
        if (res === "SUCCESS") {
          // update user Data in the dynamoDB User-Table

          let user = {
            createdAt: userData.Item.createdAt,
            email: email,
            name: username,
            gitHub: gitHub,
            linkedIn: linkedIn,
            profilePic: profilePic,
            user_id: userData.Item.user_id,
          };
          let requestOptions = {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(user),
          };

          fetch(
            `${process.env.REACT_APP_BASE_URL}user/${userData.Item.user_id}`,
            requestOptions
          )
            .then((res) => res.json())
            .then((res) => console.log(res));
        } else {
          console.log("uh oh something went wrong on our end");
        }
      });
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <input
        placeholder={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input placeholder={gitHub}></input>
      <input placeholder={linkedIn}></input>
      <button onClick={submitEdit}>test</button>
    </div>
  );
}

export default Edituser;
