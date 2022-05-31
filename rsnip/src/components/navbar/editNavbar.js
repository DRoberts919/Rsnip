import DarkModeToggle from "./darkModeToggle";
import "./navbarStyles.css";

const EditNav = ({
  goToPrevPage,
  saveSnippet,
  publishSnippet,
  saveMessage,
}) => {
  return (
    <div className="edit-nav light-shadow">
      <div className="nav-group">
        <div className="left">
          <button
            id="back"
            className="btn green-btn-outline"
            onClick={() => goToPrevPage()}
          >
            &#8249; Back
          </button>
        </div>
        <div className="right">
          <span className="dark-secondary-text">{saveMessage}</span>
          <button
            id="save"
            className="btn green-btn-outline"
            onClick={() => saveSnippet()}
          >
            Save
          </button>
          <button
            id="publish"
            className="btn green-btn"
            onClick={() => publishSnippet()}
          >
            Publish
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default EditNav;
