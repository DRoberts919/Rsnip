import "./searchStyles.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategoryImg from "../../assets/images/filter-category.jpg";
import allCategories from "../../categories.json";
import useFetch from "../../hooks/useFetch";
import SnippetCard from "../../components/snippetCard/snippetCard";

const Search = () => {
  const [snippets, setSnippets] = useState([]);
  const [filterSnippets, setFilterSnippets] = useState([]);
  const [categories, setCategories] = useState(() => {
    let tempArr = [];
    allCategories.forEach((category) => {
      tempArr.push({ category: category, isChecked: false });
    });
    return tempArr;
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("name") || ""
  );
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
    // if (snippets) {
    //   let tempFilter = [...snippets];
    //   let categoriesSelected = [];
    //   categories.forEach((category, i) => {
    //     if (category.isChecked) {
    //       categoriesSelected.push(category);
    //     }
    //   });
    //   console.log(tempFilter);
    //   console.log(categoriesSelected);
    //   setFilterSnippets(snippets);
    // }
  }, [snippets, searchParams, categories]);

  useEffect(() => {
    console.log("test".toUpperCase().includes("te".toUpperCase()));
    fetch(
      `${process.env.REACT_APP_BASE_URL}snippet?searchQuery=${searchParams.get(
        "name"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
        setFilterSnippets(data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

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
                        id={`${category}${i}`}
                      />
                      <label
                        style={{ marginLeft: "0.5rem", opacity: 0.7 }}
                        htmlFor={`${category}${i}`}
                      >
                        {category.category}
                      </label>
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
                return <SnippetCard key={`Snippet_${i}`} snippet={snippet} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
