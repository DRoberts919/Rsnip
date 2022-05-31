import "./searchStyles.css";
import { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CategoryImg from "../../assets/images/filter-category.jpg";
import allCategories from "../../categories.json";
import useFetch from "../../hooks/useFetch";
import SnippetCard from "../../components/snippetCard/snippetCard";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

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
    // if (e.key === "Enter") navigate(`/search?name=${searchInput}`);
    if (e.key === "Enter") getSearchResults();
  };

  const getSearchResults = () => {
    if (snippets) {
      //Get selected categories
      let categoriesSelected = [];
      let categoriesIDsSelected = [];
      categories.forEach((category, i) => {
        if (category.isChecked) {
          categoriesSelected.push(category);
          categoriesIDsSelected.push(category.category.id);
        }
      });

      //Add categories to url
      const params = `name=${searchInput}&categories=${categoriesIDsSelected.join(
        "-"
      )}`;

      setSearchParams(params);
    }
    fetch(`${process.env.REACT_APP_BASE_URL}snippet?searchQuery=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        //Only show data that is published
        data = data.filter((snippet) => snippet.isPublished);
        setSnippets(data);
        setFilterSnippets(data);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckbox = (i) => {
    const tempCategories = [...categories];
    tempCategories[i].isChecked = !tempCategories[i].isChecked;
    setCategories(tempCategories);
  };

  useEffect(() => {
    getSearchResults();
  }, []);
  //Get categories from query parameter
  useEffect(() => {
    let tempCategories = JSON.parse(JSON.stringify(categories));
    searchParams
      .get("categories")
      ?.split("-")
      .forEach((catId) => {
        tempCategories.map((tempCat) => {
          if (tempCat.category.id == catId) tempCat.isChecked = true;
          return tempCat;
        });
      });
    setCategories(tempCategories);
  }, []);

  useEffect(() => {
    //Get selected categories
    let tempFilter = [...snippets];
    let categoriesLabelsSelected = [];
    let categoriesSelected = [];
    categories.forEach((category, i) => {
      if (category.isChecked) {
        categoriesSelected.push(category);
        categoriesLabelsSelected.push(category.category.label);
      }
    });
    //Filter by selected categories
    if (categoriesSelected.length > 0) {
      tempFilter = tempFilter.filter((snippet) => {
        let snipHasSelectedCategory = false;
        for (let i = 0; i < snippet.published.categories.length; i++) {
          if (
            categoriesLabelsSelected.includes(snippet.published.categories[i])
          ) {
            snipHasSelectedCategory = true;
            break;
          }
        }
        if (snipHasSelectedCategory) return snippet;
      });
    }
    setFilterSnippets(tempFilter);
  }, [snippets, categories]);
  // useEffect(() => {
  //   if (snippets) {
  //     let tempFilter = [...snippets];
  //     //Get selected categories
  //     let categoriesLabelsSelected = [];
  //     let categoriesSelected = [];
  //     let categoriesIDsSelected = [];
  //     categories.forEach((category, i) => {
  //       if (category.isChecked) {
  //         categoriesSelected.push(category);
  //         categoriesLabelsSelected.push(category.category.label);
  //         categoriesIDsSelected.push(category.category.id);
  //       }
  //     });

  //     //Add categories to url
  //     const params = `name=${searchInput}&categories=${categoriesIDsSelected.join("-")}`;

  //     setSearchParams(params);

  //     //Filter by selected categories
  //     if(categoriesSelected.length > 0) {
  //     tempFilter = tempFilter.filter(snippet => {
  //       let snipHasSelectedCategory = false;
  //       for(let i = 0; i < snippet.published.categories.length; i++) {
  //         if(categoriesLabelsSelected.includes(snippet.published.categories[i])) {
  //           snipHasSelectedCategory = true;
  //           break;
  //         }
  //       }
  //       if(snipHasSelectedCategory) return snippet;
  //     });
  //   }
  //     setFilterSnippets(tempFilter);
  //   }
  // }, [snippets, categories]);

  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_BASE_URL}snippet?searchQuery=${searchParams.get(
  //       "name"
  //     )}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       //Only show data that is published
  //       data = data.filter((snippet) => snippet.isPublished)
  //       setSnippets(data);
  //       setFilterSnippets(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [searchParams]);

  return (
    <div className="content p-t-8">
      <div className="search-content light-shadow row-center">
        {/* <div>{searchParams.get("name")}</div> */}
        <div className="search-bar relative">
          <input
            id="search-input"
            className="search-snippet light-shadow m-1"
            type="text"
            placeholder="Search Snippet"
            onKeyDown={handleEnterKey}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div
            className="search-icon"
            onClick={getSearchResults}
            style={{ cursor: "pointer" }}
          >
            <div className="row">
              <div className="search-line"></div>
              <BsSearch color="#999" size={20} />
            </div>
          </div>
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
                      key={`${category.category.label}_${i}`}
                    >
                      <input
                        type="checkbox"
                        checked={category.isChecked}
                        onChange={() => handleCheckbox(i)}
                        id={`${category.category.id}`}
                      />
                      <label
                        style={{ paddingLeft: "0.5rem", opacity: 0.7 }}
                        htmlFor={`${category.category.id}`}
                      >
                        {category.category.label}
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
