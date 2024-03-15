import BASE_URL from "@/api/apiconfig";
import { useState, useEffect } from "react";

function useFetchDomains() {
  const [domains, setDomains] = useState([]);

  const fetchDomains = async () => {
    const res = await fetch(`${BASE_URL}/domains`);
    if (!res.ok) throw res.statusText;
    const json = await res.json();
    setDomains(json);
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return domains;
}

export default useFetchDomains;
