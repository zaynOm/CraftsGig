import { Link } from "react-router-dom";

// TODO: use react query to handel infinit scroll, loading and errors
function GigsList({ query }) {
  const { data: gigs, isError, isLoading } = query;

  if (isLoading || !gigs) return "Loading...";
  if (isError) return "Somthing went wrong";

  return (
    <div className="my-10">
      {gigs.map((gig) => (
        <Link key={gig.id} to={`/gigs/${gig.id}`}>
          <div className="mb-3 h-40 w-[50rem] rounded-md border border-input py-4 pl-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-black" />
              <h2>
                {gig.worker.first_name} {gig.worker.last_name}
              </h2>
            </div>

            <h1 className="m-3 text-lg font-bold">{gig.title}</h1>
            <p className="text-sm text-gray-500">{gig.city.name}</p>
            <p className="text-sm text-gray-500">{gig.worker.domain?.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GigsList;
