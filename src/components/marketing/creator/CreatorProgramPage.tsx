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

export function CreatorProgramPage() {
  const [commission, setCommission] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');
  const [ticketsPerCreator, setTicketsPerCreator] = useState('');
  const [totalTickets, setTotalTickets] = useState('');

  const selectedTicketDetails = tickets.find(t => t.id === selectedTicket);
  const remainingTickets = selectedTicketDetails 
    ? selectedTicketDetails.total - selectedTicketDetails.sold 
    : 0;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Creator Program</h1>
        <p className="text-muted-foreground">
          Partner with creators to promote your event and reach a wider audience.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-1 mb-6">
            <h3 className="text-lg font-semibold">Commission Program</h3>
            <p className="text-sm text-muted-foreground">
              Incentivize creators with sales commission for each ticket sold through their referral
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="font-medium">Commission Percentage</Label>
                <div className="relative group">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    Percentage of ticket price that creators will earn for each sale they refer from their content
                  </div>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="pr-8"
                  placeholder="Enter percentage"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-1 mb-6">
            <h3 className="text-lg font-semibold">Free Tickets</h3>
            <p className="text-sm text-muted-foreground">
              Provide complimentary tickets to creators to attend and promote your event
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
                <Label className="font-medium">Tickets per Creator</Label>
                <div className="relative group">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    Number of free tickets each creator will receive
                  </div>
                </div>
              </div>
              <Input
                type="number"
                min="1"
                value={ticketsPerCreator}
                onChange={(e) => setTicketsPerCreator(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="font-medium">Minimum Followers</Label>
                <div className="relative group">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    Note: Pulse algorithm rewards quality and not the number of followers a creator has.
                  </div>
                </div>
              </div>
              <Input
                type="number"
                min="0"
                placeholder="Enter minimum followers"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="font-medium">Total Tickets Available</Label>
                <div className="relative group">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    Maximum number of tickets that can be claimed by all creators
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
                  {ticketsPerCreator && totalTickets && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground">Max creators:</span>
                      <span className="font-medium">
                        {Math.floor(parseInt(totalTickets) / parseInt(ticketsPerCreator))}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button 
          className="bg-[#FF0000] hover:bg-red-600"
          disabled={
            !commission || !selectedTicket || !ticketsPerCreator || !totalTickets || !minimumFollowers
          }
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}