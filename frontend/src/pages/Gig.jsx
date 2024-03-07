import { useLocation } from "react-router-dom";

import ReviewCard from "../components/ReviewCard";
import useQueryFetch from "@/hooks/useQueryFetch";

export default function Gig() {
  const { pathname } = useLocation();
  const { data, isError, isFetching } = useQueryFetch("gig", pathname);

  if (isError) {
    return <div className="text-center">Something Went Wrong</div>;
  }

  return (
    <div className="mt-5 flex flex-col flex-wrap content-center gap-8">
      {isFetching || !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex gap-7">
            <div className="h-72 w-72 bg-gray-600" />
            <div className="my-8 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-black" />
                <h2>
                  {data.worker.first_name} {data.worker.last_name}
                </h2>
              </div>
              <h1 className="max-w-lg whitespace-pre-wrap text-3xl font-bold">
                {data.title}
              </h1>
              <div className="flex gap-3">
                <span className="text-sm text-gray-500">{data.city.name}</span>
                <span className="text-sm text-gray-500">
                  {data.worker.domain.title}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="my-5 w-[50rem]">{data.description}</p>
          </div>
          {data.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </>
      )}
    </div>
  );
}
