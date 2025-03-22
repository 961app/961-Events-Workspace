import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GripVertical, Plus, Clock, MoreVertical, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  setTime: string;
}

const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'OTTMANN',
    avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100',
    setTime: '22:00 - 23:30'
  },
  {
    id: 'artist-2',
    name: '&Friends',
    avatar: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100',
    setTime: '23:30 - 01:00'
  },
  {
    id: 'artist-3',
    name: 'Ahmed Spins',
    avatar: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100',
    setTime: '01:00 - 02:30'
  }
];

const searchResults = [
  {
    id: 'artist-4',
    name: 'Francis Mercier',
    avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100',
    followers: '12.5K'
  },
  {
    id: 'artist-5',
    name: 'Tripolism',
    avatar: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95?auto=format&fit=crop&q=80&w=100&h=100',
    followers: '8.2K'
  }
];

const timeSlots = [
  '20:00 - 21:30',
  '21:30 - 23:00',
  '23:00 - 00:30',
  '00:30 - 02:00',
  '02:00 - 03:30',
  '03:30 - 05:00'
];

function generateTimeSlots(startTime: string, endTime: string, duration: number = 90) {
  // TODO: Implement time slot generation logic
}

export function ArtistsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<typeof searchResults[0] | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Lineup</h1>
          <span className="text-sm text-muted-foreground">(Optional)</span>
        </div>
        <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add to Lineup
        </Button>
      </div>

      <Card className="p-6">
        <div className="text-sm text-muted-foreground mb-6 space-y-1">
          <p>Add only the performers that will perform at your event.</p>
          <p>Any policy violation will result in event cancellation and your account being banned from our platform.</p>
        </div>

        <div className="space-y-2">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="grid grid-cols-[auto,1fr,auto,auto] gap-4 items-center p-4 rounded-lg hover:bg-gray-50 cursor-move group"
            >
              <GripVertical className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={artist.avatar} />
                  <AvatarFallback>{artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{artist.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{artist.setTime}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Set Time</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add to Lineup</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search performers..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedArtist(null);
                  }}
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-2">
                {searchResults.map((artist) => (
                  <div
                    key={artist.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50",
                      selectedArtist?.id === artist.id && "bg-red-50 hover:bg-red-50"
                    )}
                    onClick={() => setSelectedArtist(artist)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={artist.avatar} />
                        <AvatarFallback>{artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-sm text-muted-foreground">{artist.followers} followers</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedArtist && (
              <div className="space-y-4">
                <div>
                  <Label>Set Time</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm text-muted-foreground">From</Label>
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm text-muted-foreground">To</Label>
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                disabled={!selectedArtist || !startTime || !endTime}
                onClick={() => setIsDialogOpen(false)}
              >Add to Lineup</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}