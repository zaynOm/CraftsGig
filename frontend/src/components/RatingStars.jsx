import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingStars({
  className,
  rating,
  setRating,
  color,
  isDisabled,
}) {
  const [hover, setHover] = useState(null);

  if (!color) color = "#ffc107";

  return (
    <div className="App">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
              disabled={isDisabled}
            />
            <Star
              className={className}
              color={currentRating <= (hover || rating) ? color : "grey"}
              fill={currentRating <= (hover || rating) ? color : "#fff"}
              onMouseEnter={() => !isDisabled && setHover(currentRating)}
              onMouseLeave={() => !isDisabled && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
