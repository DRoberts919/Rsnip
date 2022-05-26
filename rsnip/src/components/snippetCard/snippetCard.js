import { Link } from "react-router-dom";
import { useState } from "react";
import "./snippetCardStyles.css";
import { MdEdit } from "react-icons/md";

const seedrandom = require("seedrandom");

const SnippetCard = ({ snippet, isOwnProfile }) => {
  const [randomColor] = useState([
    "purple-banner",
    "orange-banner",
    "dark-blue-banner",
    "light-blue-banner",
  ]);
  return (
    <Link to={`/snippet/${snippet?.snippet_id}`}>
      <div className="snippet-card light-shadow">
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
        <div className="snippet-title">{snippet.published?.title}</div>
        <div className="snippet-description">
          {snippet.published?.description}
        </div>
        <div className="row category-group">
          {snippet.published?.categories?.map((category, idx) => {
            return (
              <div className="selected-category-tag" key={`${category}_${idx}`}>
                {category}
              </div>
            );
          })}
        </div>
        {isOwnProfile ? (
          <Link
            className="snippet-card-edit"
            to={`/snippet/edit/${snippet?.snippet_id}`}
          >
            <MdEdit color="#fff" size={28} />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};

export default SnippetCard;
