import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoostDialog } from './BoostDialog';
import { cn } from '@/lib/utils';
import { ActiveBoostDialog } from './ActiveBoostDialog';
import { EventSelector, type MarketingEvent, events as marketingEvents } from '../shared/EventSelector';
import { useState } from 'react';

interface ContentItem {
  id: string;
  image: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  ticketsSold: number;
  ticketsTotal: number;
  createdAt: Date;
}

const content: ContentItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    views: 12500,
    likes: 850,
    creator: {
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'https://i.pravatar.cc/150?u=emma1'
    },
    ticketsSold: 12,
    ticketsTotal: 50,
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    views: 8900,
    likes: 620,
    creator: {
      name: 'Liam Johnson',
      username: '@liamj',
      avatar: 'https://i.pravatar.cc/150?u=liam2'
    },
    ticketsSold: 8,
    ticketsTotal: 30,
    createdAt: new Date('2024-03-14')
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
    views: 15200,
    likes: 1100,
    creator: {
      name: 'Sophia Garcia',
      username: '@sophiag',
      avatar: 'https://i.pravatar.cc/150?u=sophia3'
    },
    ticketsSold: 15,
    ticketsTotal: 40,
    createdAt: new Date('2024-03-13')
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77',
    views: 9800,
    likes: 720,
    creator: {
      name: 'Oliver Brown',
      username: '@oliverb',
      avatar: 'https://i.pravatar.cc/150?u=oliver4'
    },
    ticketsSold: 10,
    ticketsTotal: 35,
    createdAt: new Date('2024-03-12')
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95',
    views: 11300,
    likes: 890,
    creator: {
      name: 'Ava Martinez',
      username: '@avam',
      avatar: 'https://i.pravatar.cc/150?u=ava5'
    },
    ticketsSold: 11,
    ticketsTotal: 45,
    createdAt: new Date('2024-03-11')
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    views: 7500,
    likes: 480,
    creator: {
      name: 'Noah Taylor',
      username: '@noaht',
      avatar: 'https://i.pravatar.cc/150?u=noah6'
    },
    ticketsSold: 7,
    ticketsTotal: 25,
    createdAt: new Date('2024-03-10')
  }
];

type SortOption = 'sales' | 'views' | 'newest' | 'oldest';

export function ContentPage() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showBoostDialog, setShowBoostDialog] = useState(false);
  const [showActiveBoostDialog, setShowActiveBoostDialog] = useState(false);
  const [boostedContent, setBoostedContent] = useState<string[]>(['1', '3']);
  const [selectedEvent, setSelectedEvent] = useState(marketingEvents[0].id);

  const sortedContent = [...content].sort((a, b) => {
    switch (sortBy) {
      case 'sales':
        return b.ticketsSold - a.ticketsSold;
      case 'views':
        return b.views - a.views;
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      default:
        return 0;
    }
  });

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Content</h1>
            <p className="text-muted-foreground">
              Find and Boost content from creators talking about your event
            </p>
          </div>
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Most Sales</SelectItem>
            <SelectItem value="views">Most Views</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {sortedContent.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={item.creator.avatar} />
                    <AvatarFallback>{item.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-white text-sm">
                    <div className="font-medium leading-none">{item.creator.name}</div>
                    <div className="text-white/80 text-xs">{item.creator.username}</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent space-y-2">
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{formatNumber(item.views)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span>{formatNumber(item.likes)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    {item.ticketsSold} tickets sold
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    ${(item.ticketsSold * 30).toLocaleString()}
                  </Badge>
                </div>
                <Button
                  className={cn(
                    "w-full gap-1.5 mt-3",
                    boostedContent.includes(item.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-[#FF0000] hover:bg-red-600"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (boostedContent.includes(item.id)) {
                      setShowActiveBoostDialog(true);
                    } else {
                      setShowBoostDialog(true);
                    }
                  }}
                >
                  {boostedContent.includes(item.id) ? 'Boosted' : 'Boost'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <BoostDialog
        open={showBoostDialog}
        onOpenChange={setShowBoostDialog}
      />
      <ActiveBoostDialog
        open={showActiveBoostDialog}
        onOpenChange={setShowActiveBoostDialog}
      />
    </div>
  );
}