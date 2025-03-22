import { Card } from '@/components/ui/card';
import type { TicketType } from '../SalesOverview';

interface SalesBreakdownProps {
  ticketTypes: TicketType[];
}

export function SalesBreakdown({ ticketTypes }: SalesBreakdownProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Sales breakdown</h2>
      <div className="space-y-4">
        {ticketTypes.map((ticket, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{ticket.emoji}</span>
                <span className="text-sm font-semibold">{ticket.name}</span>
                <span className="text-sm text-muted-foreground">· ${ticket.price}</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded capitalize">
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-sm font-semibold">${(ticket.sold * ticket.price)}</span>
              <div className="w-32 text-right">
                <span className="text-sm font-semibold">{ticket.sold}</span>
                <span className="text-sm text-muted-foreground"> / {ticket.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}