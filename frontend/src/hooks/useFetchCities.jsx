import { useState, useEffect } from "react";

function useFetchCities() {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    const data = await fetch("/api/cities");
    const json = await data.json();
    setCities(json);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return cities;
}

export default useFetchCities;
