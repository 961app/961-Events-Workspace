import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TicketTypeIcon } from './TicketTypeIcon';
import { TicketFormData, calculateFinalPrice } from './types';
import { useState } from 'react';

interface TicketConfirmationProps {
  onBack: () => void;
  onConfirm: () => void;
  tickets: TicketFormData[];
  isFreeEvent?: boolean;
}

export function TicketConfirmation({ tickets, onBack, onConfirm, isFreeEvent = false }: TicketConfirmationProps) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      window.location.href = '/launch-success';
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Review Tickets</h1>
        </div>
        <Button
          className="gap-2 bg-[#FF0000] hover:bg-red-600"
          onClick={handleLaunch}
          disabled={isLaunching}
        >
          {isLaunching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Launching...
            </div>
          ) : (
            <>
              Launch Event
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>


      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{ticket.name}</h3>
                    <div className="flex items-center gap-2">
                      <TicketTypeIcon type={ticket.type} />
                      <Badge variant="outline">
                        {ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!ticket.isVisible && (
                      <Badge variant="outline" className="bg-gray-100">Hidden</Badge>
                    )}
                    {ticket.isSoldOut && (
                      <Badge variant="outline" className="bg-red-100 text-red-700">Sold Out</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="ml-2 font-medium">{ticket.quantity}</span>
                    </div>
                    {ticket.maxPerOrder && (
                      <div>
                        <span className="text-muted-foreground">Max per order:</span>
                        <span className="ml-2 font-medium">{ticket.maxPerOrder}</span>
                      </div>
                    )}
                    {ticket.type === 'group' && (
                      <div>
                        <span className="text-muted-foreground">Group size:</span>
                        <span className="ml-2 font-medium">{ticket.groupSize}</span>
                      </div>
                    )}
                  </div>
                  {(ticket.saleStartDate || ticket.saleEndDate) && (
                    <div className="flex items-center gap-8 mt-2">
                      {ticket.saleStartDate && (
                        <div>
                          <span className="text-muted-foreground">Sale starts:</span>
                          <span className="ml-2 font-medium">
                            {format(ticket.saleStartDate, 'PPP')}
                            {ticket.saleStartTime && ` at ${format(new Date(ticket.saleStartTime), 'h:mm a')}`}
                          </span>
                        </div>
                      )}
                      {ticket.saleEndDate && (
                        <div>
                          <span className="text-muted-foreground">Sale ends:</span>
                          <span className="ml-2 font-medium">
                            {format(ticket.saleEndDate, 'PPP')}
                            {ticket.saleEndTime && ` at ${format(new Date(ticket.saleEndTime), 'h:mm a')}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-muted-foreground">Price (Incl. VAT & Service fees):</span>
                <span className="ml-2 font-medium">{isFreeEvent ? 'Free' : `$${calculateFinalPrice(ticket.basePrice)}`}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={onBack}
          disabled={isLaunching}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Button>
        <Button 
          className="gap-2 bg-[#FF0000] hover:bg-red-600"
          onClick={handleLaunch}
          disabled={isLaunching}
        >
          {isLaunching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Launching...
            </div>
          ) : (
            <>
              Launch Event
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}