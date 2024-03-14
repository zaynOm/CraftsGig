import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  const created_at = new Date(review.created_at).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h40 w-[50rem] rounded-md border border-input px-8 py-4">
      <div className="flex justify-between">
        <div className="flex  gap-3">
          <h3 className="text-xl font-bold">
            {review.author.first_name} {review.author.last_name}
          </h3>
        </div>
        <span>{created_at}</span>
      </div>
      <div className="ml-[-5px]">
        <RatingStars
          rating={review.rating}
          color="black"
          isDisabled={true}
          className="output-star size-5"
        />
      </div>
      <h2 className="my-3">{review.comment}</h2>
    </div>
  );
}
