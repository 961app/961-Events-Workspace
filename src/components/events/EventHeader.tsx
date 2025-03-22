import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Event } from '@/types';

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{event.date}</span>
          {event.status && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <Badge 
                variant="destructive" 
                className={cn(
                  "uppercase font-semibold",
                  event.status === 'ON SALE' && "bg-green-100 text-green-700 hover:bg-green-100",
                  event.status === 'PAST' && "bg-gray-100 text-gray-700 hover:bg-gray-100",
                  event.status === 'CANCELLED' && "bg-red-100 text-red-700 hover:bg-red-100"
                )}
              >
                {event.status}
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">Event URL</span>
        <a 
          href={`https://events.961.co/lebanon/beirut/${event.id}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 max-w-lg group"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md">
            <span className="text-muted-foreground truncate group-hover:text-[#FF0000] transition-colors">
              events.961.co/lebanon/beirut/{event.id}
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </a>
      </div>
    </div>
  );
}