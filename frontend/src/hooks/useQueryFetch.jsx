import { useQuery } from "@tanstack/react-query";

const fetcher = async (path) => {
  const res = await fetch(`/api${path}`);
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
