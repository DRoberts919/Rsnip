import "./searchStyles.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategoryImg from "../../assets/images/filter-category.jpg";
import allCategories from "../../categories.json";
import useFetch from "../../hooks/useFetch";

const Search = () => {
  const [snippets] = useFetch(process.env.REACT_APP_GET_SNIPPETS);
  const [filterSnippets, setFilterSnippets] = useState([]);
  const [categories, setCategories] = useState(() => {
    let tempArr = [];
    allCategories.forEach((category) => {
      tempArr.push({ category: category, isChecked: false });
    });
    return tempArr;
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [randomColor] = useState([
    "purple-banner",
    "orange-banner",
    "dark-blue-banner",
    "light-blue-banner",
  ]);
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  const handleEnterKey = (e) => {
    if (e.key === "Enter") navigate(`/search?name=${searchInput}`);
  };

  const handleCheckbox = (i) => {
    const tempCategories = [...categories];
    tempCategories[i].isChecked = !tempCategories[i].isChecked;
    setCategories(tempCategories);
  };

  useEffect(() => {
    //filter by search param if any
    //filer by category if any contain true
    if (snippets) {
      setFilterSnippets(snippets);
    }
  }, [snippets]);

  // useEffect(() => {
  //   console.log(searchParams.get("name"));
  // }, [searchParams]);

  return (
    <div className="content p-t-8">
      <div className="search-content light-shadow row-center">
        {/* <div>{searchParams.get("name")}</div> */}
        <div className="search-bar relative">
          <input
            className="search-snippet light-shadow m-1"
            type="text"
            placeholder="Search Snippet"
            onKeyDown={handleEnterKey}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Link className="search-icon" to={`/search?name=${searchInput}`}>
            <div className="row">
              <div className="search-line"></div>
              <BsSearch color="#999" size={20} />
            </div>
          </Link>
        </div>
        <div className="relative">
          <img
            onClick={() => setOpenCategory((prev) => !prev)}
            className="category-img"
            src={CategoryImg}
            alt="Category"
          />
          {openCategory ? (
            <div className="category-box light-shadow">
              <div className="category-title">Category Filter</div>
              <div className="category-border-line"></div>
              <div className="txt-left">
                {categories?.map((category, i) => {
                  return (
                    <div
                      className="row align-center"
                      key={`${category.category}_${i}`}
                    >
                      <input
                        type="checkbox"
                        checked={category.isChecked}
                        onChange={() => handleCheckbox(i)}
                      />
                      <div style={{ marginLeft: "0.5rem", opacity: 0.7 }}>
                        {category.category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div className="row-center">
          {filterSnippets && filterSnippets.length > 0
            ? filterSnippets?.map((snippet, i) => {
                return (
                  <div
                    className="snippet-card light-shadow"
                    key={`Snippet_${i}`}
                  >
                    <div
                      className={`banner snippet-banner ${
                        randomColor[
                          Math.floor(Math.random() * randomColor.length)
                        ]
                      }`}
                    ></div>
                    <div className="snippet-title">
                      {snippet.published?.title}
                    </div>
                    <div className="snippet-description">
                      {snippet.published?.description}
                    </div>
                    <div className="row category-group">
                      {snippet.published?.categories?.map((category, idx) => {
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
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
