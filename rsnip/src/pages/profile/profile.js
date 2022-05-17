import "./profileStyles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkedIn from "../../assets/images/linkedin-icon.svg";
import Github from "../../assets/images/github-icon.svg";
import Email from "../../assets/images/email-icon.svg";
import useFetch from "../../hooks/useFetch";
const seedrandom = require("seedrandom");

// Profile images
// https://ashwinvalento.github.io/cartoon-avatar/

// Example
// https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

const Profile = () => {
  const { userId } = useParams();
  const [profileData] = useFetch(
    `https://2ao7thmdcd.execute-api.us-west-1.amazonaws.com/Testing/snippet/user/${userId}`
  );
  const [randomColor, setRandomColor] = useState([
    "purple-banner",
    "orange-banner",
    "dark-blue-banner",
    "light-blue-banner",
  ]);

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
              return (
                <div className="snippet-card light-shadow" key={`Snippet_${i}`}>
                  <div
                    className={`banner snippet-banner ${
                      randomColor[
                        Math.floor(
                          (snippet?.snippet_id
                            ? seedrandom(`${snippet?.snippet_id}`)()
                            : Math.random()) * randomColor.length
                        )
                      ]
                    }`}
                  ></div>
                  <div className="snippet-title">{snippet.published.title}</div>
                  <div className="snippet-description">
                    {snippet.published.description}
                  </div>
                  <div className="row category-group">
                    {snippet.published.categories?.map((category, idx) => {
                      return (
                        <div
                          className="selected-category-tag"
                          key={`${category}_${idx}`}
                        >
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
