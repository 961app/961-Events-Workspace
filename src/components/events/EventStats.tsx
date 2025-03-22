import { Card } from '@/components/ui/card';
import type { Event } from '@/types';

interface EventStatsProps {
  event: Event;
}

export function EventStats({ event }: EventStatsProps) {
  const stats = [
    { 
      label: 'Tickets Sold',
      value: event.tickets
    },
    { 
      label: 'Conversion',
      value: '3.2%'
    },
    { 
      label: 'Total Revenue',
      value: `$${event.revenue.toLocaleString()}`
    },
    { 
      label: 'No-Show Rate',
      value: '2.1%'
    },
    { 
      label: 'Resale Rev',
      value: '$180'
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}