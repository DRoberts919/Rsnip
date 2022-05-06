import "./searchStyles.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("name"));
  }, [searchParams]);
  return (
    <div className="content p-t-8">
      <div className="search-content">
        <div>Search Page</div>
        <div>{searchParams.get("name")}</div>
      </div>
    </div>
  );
};

export default Search;
