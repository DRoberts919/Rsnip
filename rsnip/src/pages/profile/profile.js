import "./profileStyles.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LinkedIn from "../../assets/images/linkedin-icon.svg";
import Github from "../../assets/images/github-icon.svg";
import Email from "../../assets/images/email-icon.svg";
import useFetch from "../../hooks/useFetch";
import SnippetCard from "../../components/snippetCard/snippetCard";
import EditAccountModal from "../../components/editAccountModal/editAccountModal";
import { UserContext } from "../../hooks/useContext";
import { Auth } from "aws-amplify";

// Profile images
// https://ashwinvalento.github.io/cartoon-avatar/

// Example
// https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

const Profile = () => {
  const { userId } = useParams();
  const [snippetData] = useFetch(
    `${process.env.REACT_APP_BASE_URL}snippet/user/${userId}`
  );
  const [profileData, setProfileData] = useState();
  const [cognitoUser, setCognitoUser] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [user] = useContext(UserContext); // auth user credentials
  const [, setSnippetId] = useState();

  const [userOnOwnProfile, setUserOnOwnProfile] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data?.Item);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //If user has a valid session and they are on their own profile page, then set the cognito user data
    if (userId === user?.user_id) {
      setUserOnOwnProfile(true);
      try {
        // get your current session from Auth.currentAuthenticatedUser()
        let cognitoUser = Auth.currentAuthenticatedUser().then((data) => {
          setCognitoUser(() => data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const createAndReturnSnippetId = async () => {
    let snippetObject = {
      user_id: user.user_id,
      dateCreated: "",
      isPublished: false,
      saved: {
        dateUpdated: "",
        visibility: [""],
        title: "",
        description: "",
        categories: ["", ""],
        code: {
          structureLanguage: "",
          structure: "",
          stylesLanguage: "",
          styles: "",
          functionLanguage: "",
          functionality: "",
          imports: ["", ""],
        },
      },
      published: {
        dateUpdated: "",
        visibility: [""],
        title: "My New Snippet",
        description: "",
        categories: ["", ""],
        code: {
          structureLanguage: "",
          structure: "",
          stylesLanguage: "",
          styles: "",
          functionLanguage: "",
          functionality: "",
          imports: ["", ""],
        },
      },
    };
    await fetch(`${process.env.REACT_APP_BASE_URL}snippet`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetObject),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/snippet/edit/${data}`);
        setSnippetId(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="content row-center align-start p-t-8">
        <div className="profile-section light-shadow txt-center">
          <img
            className="user-img light-shadow"
            src={profileData?.profilePic}
            alt="Profile Img"
          />
          <a href={profileData?.linkedIn} target="_blank" rel="noreferrer">
            <img className="linkedin-icon" src={LinkedIn} alt="LinkedIn" />
          </a>
          <a href={profileData?.gitHub} target="_blank" rel="noreferrer">
            <img className="github-icon" src={Github} alt="Github" />
          </a>
          <a
            href={`mailto:${profileData?.email}`}
            target="_blank"
            rel="noreferrer"
          >
            <img className="email-icon" src={Email} alt="Email" />
          </a>
          <div className="username-title">{profileData?.name}</div>
          <div>{profileData?.email}</div>
          {userOnOwnProfile ? (
            <div
              onClick={() => {
                setEditModalOpen(true);
              }}
              className="btn green-btn light-shadow m-1"
            >
              Edit Account
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="snippet-container ">
          <div className="profile-title-section">
            <div className="profile-title">{profileData?.name}'s Snippets</div>
            <div
              id="add-snippet"
              className="plus-btn light-shadow"
              onClick={() => {
                createAndReturnSnippetId();
              }}
            >
              +
            </div>
          </div>
          <div className="snippet-scrollbar">
            <div className="snippet-section">
              {snippetData?.Items?.map((snippet, i) => {
                return (
                  <SnippetCard
                    key={`Snippet_${i}`}
                    snippet={snippet}
                    isOwnProfile={userOnOwnProfile}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {userOnOwnProfile ? (
        <EditAccountModal
          isOpen={editModalOpen}
          setOpen={setEditModalOpen}
          userInfo={profileData}
          setInfo={setProfileData}
          cognitoUser={cognitoUser}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
