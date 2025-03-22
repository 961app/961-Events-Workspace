import { Calendar, Users, Ticket } from 'lucide-react';

interface TicketTypeIconProps {
  type: 'single' | 'pass' | 'group';
  className?: string;
}

export function TicketTypeIcon({ type, className = "h-4 w-4" }: TicketTypeIconProps) {
  switch (type) {
    case 'single':
      return <Ticket className={className} />;
    case 'pass':
      return <Calendar className={className} />;
    case 'group':
      return <Users className={className} />;
  }
}