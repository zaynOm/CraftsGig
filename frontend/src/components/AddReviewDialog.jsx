import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import RatingStars from "./RatingStars";
import { useAuth } from "@/context/AuthContext";

export function AddReviewDialog({ gigId, isDisabled }) {
  const { getUserId, getToken } = useAuth();
  const [rating, setRating] = useState(3);
  const comment = useRef();

  const onSubmit = async () => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment.current.value,
          gig_id: gigId,
          author_id: getUserId(),
        }),
      });

      if (!res.ok) throw new Error(res.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isDisabled}>
          Add a review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review this gig</DialogTitle>
          <DialogDescription>
            Make a new review based on your expierece with the craftsman, and
            the quality of the service he provided.
          </DialogDescription>
        </DialogHeader>
        <RatingStars
          rating={rating}
          setRating={setRating}
          className="input-star"
        />
        <Textarea
          id="comment"
          placeholder="How was the service?"
          ref={comment}
        />
        <DialogFooter>
          <Button onClick={onSubmit}>Share the review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
