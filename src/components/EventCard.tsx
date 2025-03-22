import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Event } from '@/types';
import { differenceInDays } from 'date-fns';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
  onClick?: () => void;
}

export function EventCard({ event, isPast, onClick }: EventCardProps) {
  const isDraft = event.status === 'DRAFT';

  return (
    <div
      className={`bg-white rounded-xl p-5 flex items-center gap-6 hover:shadow-xl hover:border-red-100 transition-all duration-300 border border-gray-100 group ${
        isPast ? 'opacity-75' : ''
      } cursor-pointer`}
      onClick={onClick}
    >
      {!isPast && !isDraft && (
        <div className="w-[60px] h-full flex items-center justify-center bg-red-600 text-white font-bold">
          <div className={cn(
            event.status === 'LIVE' ? 'bg-green-600' : 'bg-red-600',
            'w-[60px] h-full flex items-center justify-center text-white font-bold'
          )}>
            {event.status === 'LIVE' ? 'LIVE' : `D-${differenceInDays(event.dateObj, new Date())}`}
          </div>
        </div>
      )}
      
      {!isDraft && event.image && (
        <div className="w-[108px] h-[61px] flex items-center justify-center bg-gray-50 rounded-md overflow-hidden border border-gray-100 group-hover:border-red-100 group-hover:shadow-md transition-all duration-300">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''} group-hover:scale-105 transition-transform duration-300`}
          />
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="font-bold text-base group-hover:text-red-600 transition-colors duration-300">{event.title}</h3>
        {!isDraft && (
          <div className="text-sm text-muted-foreground">
            {event.date}
          </div>
        )}
      </div>

      {isDraft ? (
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          Edit
        </Button>
      ) : (
        <div className="flex items-center gap-16">
        <div className="flex flex-col items-center gap-1">
          <div className="text-right">
            <div className="font-bold text-lg">${event.revenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">$0 today</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <div className="text-center">
            <div className="font-bold text-lg">{event.tickets}</div>
            <div className="text-sm text-muted-foreground">0 today</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <div className="w-16 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${event.progress}%` }}
            />
          </div>
          <span className="text-sm font-medium">{event.progress}%</span>
        </div>
      </div>
      )}
    </div>
  );
}