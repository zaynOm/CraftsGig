import { useQuery } from "@tanstack/react-query";
import BASE_URL from "@/api/apiconfig";

const fetcher = async (path) => {
  const res = await fetch(`${BASE_URL}/${path}`);
  if (!res.ok) throw res.statusText;
  return res.json();
};

export default function useQueryFetch(key, path) {
  const query = useQuery({
    queryKey: [key],
    queryFn: () => fetcher(path),
    refetchOnWindowFocus: false,
  });

  return query;
}
