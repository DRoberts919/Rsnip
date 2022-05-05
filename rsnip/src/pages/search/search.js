import "./searchStyles.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("name"));
  }, [searchParams]);
  return (
    <>
      <div>Search Page</div>
      <div>{searchParams.get("name")}</div>
    </>
  );
};

export default Search;
