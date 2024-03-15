import { useState, useEffect } from "react";
import BASE_URL from "@/api/apiconfig";

function useFetchCities() {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    const data = await fetch(`${BASE_URL}/cities`);
    const json = await data.json();
    setCities(json);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return cities;
}

export default useFetchCities;
