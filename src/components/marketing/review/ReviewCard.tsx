import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Review } from './types';

interface ReviewCardProps {
  review: Review;
  isReplied: boolean;
  replyText: string;
  onReplyChange: (text: string) => void;
  onReply: () => void;
}

export function ReviewCard({ review, isReplied, replyText, onReplyChange, onReply }: ReviewCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.avatar} />
              <AvatarFallback>{review.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{review.name}</div>
              <StarRating rating={review.rating} />
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium line-clamp-1">{review.event.title}</div>
            <div className="text-sm text-muted-foreground">{review.event.date}</div>
          </div>
        </div>

        <p className="text-gray-600">{review.review}</p>

        {!isReplied ? (
          <div className="space-y-2">
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => onReplyChange(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={!replyText}
                onClick={onReply}
                className="bg-[#FF0000] hover:bg-red-600"
              >
                Reply
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Replied</span>
          </div>
        )}
      </div>
    </div>
  );
}