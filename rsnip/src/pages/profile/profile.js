import "./profileStyles.css";

const Profile = () => {
  // Get ID from params and fetch user information
  return (
    <div className="content row-center align-start p-t-8 p-b-12 border-test">
      <div className="profile-section light-shadow">Profile section</div>
      <div className="snippet-section row-space-evenly">
        <div className="snippet-card">test</div>
        <div className="snippet-card">test</div>
        <div className="snippet-card">test</div>
        <div className="snippet-card">test</div>
      </div>
    </div>
  );
};

export default Profile;
