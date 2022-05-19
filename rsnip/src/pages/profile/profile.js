import "./profileStyles.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkedIn from "../../assets/images/linkedin-icon.svg";
import Github from "../../assets/images/github-icon.svg";
import Email from "../../assets/images/email-icon.svg";
import useFetch from "../../hooks/useFetch";
import SnippetCard from "../../components/snippetCard/snippetCard";

// Profile images
// https://ashwinvalento.github.io/cartoon-avatar/

// Example
// https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

const Profile = () => {
  const { userId } = useParams();
  const [profileData] = useFetch(
    `${process.env.REACT_APP_BASE_URL}/snippet/user/${userId}`
  );

  return (
    <div className="content row-center align-start p-t-8">
      <div className="profile-section light-shadow txt-center">
        <img
          className="user-img light-shadow"
          src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
          alt="Profile Img"
        />
        <img className="linkedin-icon" src={LinkedIn} alt="LinkedIn" />
        <img className="github-icon" src={Github} alt="Github" />
        <img className="email-icon" src={Email} alt="Email" />
        <div className="username-title">Username</div>
        <div>fetch_userid@param.com</div>
        <div
          onClick={() => {
            console.log("Modal popup to edit account?");
          }}
          className="btn green-btn light-shadow m-1 m-b-2"
        >
          Edit Account
        </div>
      </div>
      <div className="snippet-container ">
        <div className="profile-title-section">
          <div className="profile-title">John Doe's Snippets</div>
          <div
            className="plus-btn light-shadow"
            onClick={() => {
              console.log("Navigate to create snippet");
            }}
          >
            +
          </div>
        </div>
        <div className="snippet-scrollbar">
          <div className="snippet-section">
            {profileData?.Items?.map((snippet, i) => {
              return <SnippetCard key={`Snippet_${i}`} snippet={snippet} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
