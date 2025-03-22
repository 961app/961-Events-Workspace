import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface Event {
  id: string;
  title: string;
  date: string;
  status: 'ON SALE' | 'PAST' | 'CANCELLED';
  image: string;
}

interface EventSelectorProps {
  events: Event[];
  defaultValue?: string;
}

export function EventSelector({ events, defaultValue }: EventSelectorProps) {
  const selectedEvent = events.find(e => e.id === defaultValue) || events[0];

  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[500px]">
        <SelectValue>
          <div className="flex items-center gap-3">
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <div className="flex items-center gap-2">
              <span className="font-bold">{selectedEvent.title}</span>
              {selectedEvent.status && (
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  selectedEvent.status === 'ON SALE' && "bg-green-100 text-green-700",
                  selectedEvent.status === 'PAST' && "bg-gray-100 text-gray-700",
                  selectedEvent.status === 'CANCELLED' && "bg-red-100 text-red-700"
                )}>{selectedEvent.status}</span>
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
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      event.status === 'ON SALE' && "bg-green-100 text-green-700",
                      event.status === 'PAST' && "bg-gray-100 text-gray-700",
                      event.status === 'CANCELLED' && "bg-red-100 text-red-700"
                    )}>{event.status}</span>
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