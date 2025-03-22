import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MarketingEvent {
  id: string;
  title: string;
  date: string;
  status: 'ON SALE' | 'PAST' | 'CANCELLED';
  image: string;
}

export const events: MarketingEvent[] = [
  {
    id: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    date: 'Mar 28, 2025',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    date: 'Feb 25, 2025',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-3',
    title: 'BATEAU MOVE x CIAO HABIBI MILAN',
    date: 'Feb 22, 2025',
    status: 'CANCELLED',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

interface EventSelectorProps {
  events: MarketingEvent[];
  selectedEvent?: string;
  onEventChange: (eventId: string) => void;
}

export function EventSelector({ events, selectedEvent, onEventChange }: EventSelectorProps) {
  const selected = events.find(e => e.id === selectedEvent) || events[0];

  return (
    <Select value={selectedEvent} onValueChange={onEventChange}>
      <SelectTrigger className="w-[500px]">
        <SelectValue>
          <div className="flex items-center gap-3">
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <div className="flex items-center gap-2">
              <span className="font-bold">{selected.title}</span>
              {selected.status && (
                <Badge variant="outline" className={cn(
                  "text-xs",
                  selected.status === 'ON SALE' && "bg-green-100 text-green-700 border-green-200",
                  selected.status === 'PAST' && "bg-gray-100 text-gray-700 border-gray-200",
                  selected.status === 'CANCELLED' && "bg-red-100 text-red-700 border-red-200"
                )}>{selected.status}</Badge>
              )}
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[300px]">
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              <div className="flex items-center gap-3 py-1">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{event.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      event.status === 'ON SALE' && "bg-green-100 text-green-700 border-green-200",
                      event.status === 'PAST' && "bg-gray-100 text-gray-700 border-gray-200",
                      event.status === 'CANCELLED' && "bg-red-100 text-red-700 border-red-200"
                    )}>{event.status}</Badge>
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}