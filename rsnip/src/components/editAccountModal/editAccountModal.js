import { useEffect, useState } from "react";
import "./editAccountModalStyles.css";
import { Auth } from "aws-amplify";

const EditAccountModal = ({
  isOpen,
  setOpen,
  userInfo,
  setInfo,
  cognitoUser,
}) => {
  const [tempUserData, setTempUserData] = useState();

  const closeModal = () => {
    setOpen(false);
  };

  const updateField = (fieldName, value) => {
    let tempData = JSON.parse(JSON.stringify(tempUserData));
    tempData[fieldName] = value;
    setTempUserData(tempData);
  };
  useEffect(() => {
    setTempUserData(userInfo);
  }, [userInfo]);

  const submitEdit = async () => {
    // event.preventDefault();

    // update users info for congito;
    if (cognitoUser !== null && tempUserData !== null) {
      // UpdateUserAttribute will update the specific user within cognito
      let result = await Auth.updateUserAttributes(cognitoUser, {
        email: tempUserData.email,
        name: tempUserData.name,
      }).then((res) => {
        console.log(res);
        // if response is successfull then move on to updating dynamodb.
        if (res === "SUCCESS") {
          // update user Data in the dynamoDB User-Table

          let user = {
            createdAt: userInfo.createdAt,
            email: tempUserData.email,
            name: tempUserData.name,
            gitHub: tempUserData.gitHub,
            linkedIn: tempUserData.linkedIn,
            profilePic: tempUserData.profilePic,
            user_id: userInfo.user_id,
          };
          let requestOptions = {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(user),
          };

          fetch(
            `https://2ao7thmdcd.execute-api.us-west-1.amazonaws.com/Testing/user/${userInfo.user_id}`,
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

  const updateProfile = () => {
    //Use Dylan's lambda
    submitEdit().then(() => {
      //Update front end user state
      setInfo(tempUserData);
      //close modal
      closeModal();
    });
  };

  if (!!(isOpen && userInfo)) {
    return (
      <div className="edit-account-modal">
        <div className="screen" onClick={closeModal}></div>
        <div className="modal">
          <button className="close-modal-btn" onClick={closeModal}>
            ✕
          </button>
          <div className="modal-header">
            <h1>Edit Account</h1>
          </div>
          <div className="modal-body">
            <div className="imput-field image-selection">
              <label className="modal-label">Profile Picture</label>
              <div className="male-row">
                {[8, 45, 3, 4].map((value, index) => {
                  return (
                    <div
                      key={`male-image${index}`}
                      className={`profile-pic-container ${
                        tempUserData?.profilePic ===
                        `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/${value}.png`
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "profilePic",
                          `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/${value}.png`
                        )
                      }
                    >
                      <img
                        src={`https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/${value}.png`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="female-row">
                {[17, 20, 3, 10].map((value, index) => {
                  return (
                    <div
                      key={`female-image${index}`}
                      className={`profile-pic-container ${
                        tempUserData?.profilePic ===
                        `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${value}.png`
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        updateField(
                          "profilePic",
                          `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${value}.png`
                        )
                      }
                    >
                      <img
                        src={`https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${value}.png`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="input-field type2">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="text"
                id="usernameInput"
                value={tempUserData?.name}
                onChange={(evt) => updateField("name", evt.target.value)}
              />
            </div>
            <div className="input-field type2">
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                id="emailInput"
                value={tempUserData?.email}
                onChange={(evt) => updateField("email", evt.target.value)}
              />
            </div>
            <div className="input-field type2">
              <label htmlFor="linkedInInput">LinkedIn</label>
              <input
                type="text"
                id="linkedInInput"
                value={tempUserData?.linkedIn}
                onChange={(evt) => updateField("linkedIn", evt.target.value)}
              />
            </div>
            <div className="input-field type2">
              <label htmlFor="gitHubInput">GitHub</label>
              <input
                type="text"
                id="gitHubInput"
                value={tempUserData?.gitHub}
                onChange={(evt) => updateField("gitHub", evt.target.value)}
              />
            </div>

            <button className="btn green-btn" onClick={updateProfile}>
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  } else return <></>;
};

export default EditAccountModal;
