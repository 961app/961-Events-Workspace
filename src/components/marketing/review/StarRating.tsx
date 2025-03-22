import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, size = 'sm' }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            size === 'sm' ? "h-4 w-4" : "h-5 w-5",
            i < rating ? "text-[#FF0000] fill-[#FF0000]" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}