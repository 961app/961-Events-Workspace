import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReviewHeader } from './review/ReviewHeader';
import { ReviewCard } from './review/ReviewCard';
import { reviews } from './review/data';

export function ReviewSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [repliedReviews, setRepliedReviews] = useState<Record<string, boolean>>(
    reviews.reduce((acc, review) => ({ ...acc, [review.id]: review.replied || false }), {})
  );

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const filteredReviews = reviews.filter(review =>
    review.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReply = (reviewId: string) => {
    if (replyText[reviewId]) {
      setRepliedReviews(prev => ({ ...prev, [reviewId]: true }));
      setReplyText(prev => ({ ...prev, [reviewId]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <ReviewHeader
        averageRating={averageRating}
        totalReviews={reviews.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isReplied={repliedReviews[review.id]}
            replyText={replyText[review.id] || ''}
            onReplyChange={(text) => setReplyText(prev => ({ ...prev, [review.id]: text }))}
            onReply={() => handleReply(review.id)}
          />
        ))}
      </div>
    </div>
  );
}