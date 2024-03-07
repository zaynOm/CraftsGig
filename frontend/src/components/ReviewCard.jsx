// TODO: add rating stars

export default function ReviewCard({ review }) {
  const created_at = new Date(review.created_at).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h40  w-[42rem] border-2 border-black px-8 py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-black" />
          <h3>
            {review.author.first_name} {review.author.last_name}
          </h3>
        </div>
        <span>{created_at}</span>
      </div>
      <h2 className="m-3">{review.comment}</h2>
    </div>
  );
}
