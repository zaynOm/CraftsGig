import { useLocation } from "react-router-dom";

import ReviewCard from "../components/ReviewCard";
import useQueryFetch from "@/hooks/useQueryFetch";
import { AddReviewDialog } from "@/components/AddReviewDialog";
import { useAuth } from "@/context/AuthContext";

export default function Gig() {
  const { authenticated } = useAuth();
  const { pathname } = useLocation();
  const { data, isError, isFetching } = useQueryFetch("gig", pathname);

  if (isError) {
    return <div className="text-center">Something Went Wrong</div>;
  }

  return (
    <div className="my-10 flex flex-col flex-wrap content-center gap-8">
      {isFetching || !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-16 rounded-full bg-black" />
              <h2 className="text-xl">
                {data.worker.first_name} {data.worker.last_name}
              </h2>
            </div>
            <h1 className="max-w-[50rem] whitespace-pre-wrap text-3xl font-bold">
              {data.title}
            </h1>
            <div className="flex gap-3">
              <span className="text-sm text-gray-500">{data.city.name}</span>
              <span className="text-sm text-gray-500">
                {data.worker.domain.title}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="my-5 w-[50rem]">{data.description}</p>
          </div>
          <AddReviewDialog gigId={data.id} isDisabled={!authenticated} />
          {!data.reviews.length ? (
            <div className="self-center">No reviews</div>
          ) : (
            data.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </>
      )}
    </div>
  );
}
