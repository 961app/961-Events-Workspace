import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { StarRating } from './StarRating';

interface ReviewHeaderProps {
  averageRating: number;
  totalReviews: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ReviewHeader({ averageRating, totalReviews, searchQuery, onSearchChange }: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} size="md" />
          <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({totalReviews} reviews)</span>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-[300px]"
        />
      </div>
    </div>
  );
}