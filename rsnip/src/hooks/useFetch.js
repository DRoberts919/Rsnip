import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [url]);
  useEffect(() => {
    console.log(url, data);
  }, [data]);
  return [data, setData];
};

export default useFetch;
