import { Link } from "react-router-dom";

import useQueryFetch from "@/hooks/useQueryFetch";

// TODO: use react query to handel infinit scroll, loading and errors
function GigsList() {
  const { data: gigs, isError, isLoading } = useQueryFetch("gigs", "/gigs");

  if (isError) {
    return <div>Somthing went wrong</div>;
  }

  return (
    <div>
      {isLoading || !gigs
        ? "Loading..."
        : gigs.map((gig) => (
            <Link key={gig.id} to={`/gigs/${gig.id}`}>
              <div className="mb-3 h-40 w-[42rem] border-2 border-black py-4 pl-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-black" />
                  <h2>
                    {gig.worker.first_name} {gig.worker.last_name}
                  </h2>
                </div>

                <h1 className="m-3 text-lg font-bold">{gig.title}</h1>
                <p className="text-sm text-gray-500">{gig.city.name}</p>
                <p className="text-sm text-gray-500">
                  {gig.worker.domain.title}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
}

export default GigsList;
