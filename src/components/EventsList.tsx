import { EventCard } from '@/components/EventCard';
import { Event } from '@/types';

interface EventsListProps {
  title: string;
  events: Event[];
  isPast?: boolean;
  onEventClick?: (event: Event) => void;
}

export function EventsList({ title, events, isPast, onEventClick }: EventsListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            isPast={isPast} 
            onClick={() => onEventClick?.(event)} 
          />
        ))}
      </div>
    </div>
  );
}