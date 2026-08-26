import { Star, ThumbsUp, ImageIcon } from 'lucide-react';
import type { Review } from '@/lib/data';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-start gap-3">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{review.userName}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-sm font-semibold text-success">
              <Star className="h-3.5 w-3.5 fill-success" /> {review.rating}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
          {review.hasPhoto && (
            <div className="mt-3 flex gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}
          <button className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4" /> Helpful ({review.helpful})
          </button>
        </div>
      </div>
    </div>
  );
}
