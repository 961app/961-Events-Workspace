import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface Ticket {
  id: string;
  name: string;
  price: number;
  total: number;
  sold: number;
}

const tickets: Ticket[] = [
  { id: '1', name: 'Early Bird', price: 25, total: 100, sold: 20 },
  { id: '2', name: 'Regular', price: 35, total: 200, sold: 50 },
  { id: '3', name: 'VIP', price: 50, total: 50, sold: 10 }
];

export function NineOneSixPage() {
  const [selectedTicket, setSelectedTicket] = useState('');
  const [ticketsPerStaff, setTicketsPerStaff] = useState('');
  const [totalTickets, setTotalTickets] = useState('');

  const selectedTicketDetails = tickets.find(t => t.id === selectedTicket);
  const remainingTickets = selectedTicketDetails 
    ? selectedTicketDetails.total - selectedTicketDetails.sold 
    : 0;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">961 Team Invites</h1>
        <p className="text-muted-foreground">
          Introduce 961's team members to your events by inviting them to attend.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Free Tickets</h3>
          <p className="text-sm text-muted-foreground">
            Provide complimentary tickets for 961 team members to experience your event
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-medium">Select Ticket Type</Label>
            <Select value={selectedTicket} onValueChange={setSelectedTicket}>
              <SelectTrigger>
                <SelectValue placeholder="Choose ticket type" />
              </SelectTrigger>
              <SelectContent>
                {tickets.map((ticket) => (
                  <SelectItem key={ticket.id} value={ticket.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span>{ticket.name}</span>
                      <span className="font-medium">${ticket.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Tickets per Staff</Label>
              <div className="relative group">
                <Info className="h-4 w-4 text-muted-foreground" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  Number of free tickets each staff member will receive
                </div>
              </div>
            </div>
            <Input
              type="number"
              min="1"
              value={ticketsPerStaff}
              onChange={(e) => setTicketsPerStaff(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Total Tickets Available</Label>
              <div className="relative group">
                <Info className="h-4 w-4 text-muted-foreground" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  Maximum number of tickets that can be claimed by all staff members
                </div>
              </div>
            </div>
            <Input
              type="number"
              min="1"
              max={remainingTickets}
              value={totalTickets}
              onChange={(e) => setTotalTickets(e.target.value)}
              placeholder="Enter total tickets"
            />
            {selectedTicketDetails && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available tickets:</span>
                  <span className="font-medium">{remainingTickets}</span>
                </div>
                {ticketsPerStaff && totalTickets && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-muted-foreground">Max staff members:</span>
                    <span className="font-medium">
                      {Math.floor(parseInt(totalTickets) / parseInt(ticketsPerStaff))}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Button 
          className="bg-[#FF0000] hover:bg-red-600"
          disabled={!selectedTicket || !ticketsPerStaff || !totalTickets}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}