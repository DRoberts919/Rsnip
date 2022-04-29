import "./profileStyles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../json/profileTest.json";

const Profile = () => {
  const [profileData, setProfileData] = useState(data);
  const { userId } = useParams();
  const [randomColor, setRandomColor] = useState([
    "purple-banner",
    "orange-banner",
    "dark-blue-banner",
    "light-blue-banner",
  ]);

  // useEffect(() => {
  // Fetch /snippet/user/{user_id} and set response to setProfileData
  // console.log(profileData);
  // console.log(userId);
  // }, [profileData, userId]);

  return (
    <div className="content row-center align-start p-t-8">
      <div className="profile-section light-shadow">Profile section</div>
      <div className="snippet-container snippet-scrollbar">
        <div className="snippet-section">
          {profileData?.map((snippet, i) => {
            return (
              <div className="snippet-card light-shadow" key={`Snippet_${i}`}>
                <div
                  className={`banner snippet-banner ${
                    randomColor[Math.floor(Math.random() * randomColor.length)]
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
  );
};

export default Profile;
