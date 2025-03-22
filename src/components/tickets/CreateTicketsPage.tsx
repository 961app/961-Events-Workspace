import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TimePicker } from '@/components/ui/time-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TicketConfirmation } from './TicketConfirmation';
import { Switch } from '@/components/ui/switch';
import { Info, Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { TicketTypeSelect } from './TicketTypeSelect';
import { TicketPriceCalculator } from './TicketPriceCalculator';
import { TicketFormData, initialTicketData } from './types';
import { TimeSlot } from '@/components/events/EventSchedulePage';

interface CreateTicketsPageProps {
  onBack: () => void;
  onNext?: (tickets: TicketFormData[]) => void;
  timeSlots: TimeSlot[];
  isFreeEvent?: boolean;
}

function CreateTicketsPage({ onBack, onNext, timeSlots, isFreeEvent = false }: CreateTicketsPageProps) {
  const [tickets, setTickets] = useState<TicketFormData[]>([initialTicketData]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  React.useEffect(() => {
    if (Array.isArray(timeSlots) && timeSlots.length > 0) {
      const dates = timeSlots.reduce<Date[]>((acc, slot) => {
        if (slot.startDate && slot.endDate) {
          const startDate = new Date(slot.startDate);
          const endDate = new Date(slot.endDate);
          const dateRange: Date[] = [];
          let currentDate = startDate;

          while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return [...acc, ...dateRange];
        }
        return acc;
      }, []);

      if (dates.length > 0) {
        setAvailableDates(dates.sort((a, b) => a.getTime() - b.getTime()));
      }
    }
  }, [timeSlots]);

  const addTicket = () => {
    setTickets([...tickets, { ...initialTicketData }]);
  };

  const updateTicket = (index: number, field: keyof TicketFormData, value: any) => {
    const updatedTickets = [...tickets];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setTickets(updatedTickets);
  };

  if (showConfirmation) {
    return (
      <TicketConfirmation
        tickets={tickets}
        onBack={() => setShowConfirmation(false)}
        onConfirm={() => {
          // Handle event publishing
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="gap-2"
                onClick={onBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Tickets</h1>
            </div>

          </div>
        </div>
        <div>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={() => {
              if (onNext) onNext(tickets);
            }}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="fixed left-0 top-32 w-48 space-y-6 px-4">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Guide</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <div className="font-medium text-foreground">Single Ticket</div>
                <p>Individual tickets for single-day access.</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">Event Pass</div>
                <p>Multi-day access with a single ticket.</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">Group</div>
                <p>Tickets for groups of a specific size.</p>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
                <p className="mt-2">For example: If an event runs for 3 days, single ticket holders need separate tickets for each day, while pass holders get access to all days with one ticket.</p>
              </div>
            </div>
          </div>
        </div>
      <div className="flex-1 space-y-6">
        {tickets.map((ticket, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Ticket {index + 1}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!ticket.isVisible}
                      onCheckedChange={(checked) => updateTicket(index, 'isVisible', !checked)}
                      className="bg-input data-[state=checked]:bg-[#FF0000] data-[state=checked]:hover:bg-[#FF0000]/90"
                    />
                    <Label className="ml-2">Private</Label>
                    <div className="relative group">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        Ticket won't be public. Only accessible to those who receive a ticket link.
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      Private tickets aren't shown to the public. Only accessible to those who receive a ticket link.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">

                <div className="space-y-2">
                  <Label>Ticket Name *</Label>
                  <Input
                    placeholder="e.g., Early Bird, VIP, etc."
                    value={ticket.name}
                    onChange={(e) => updateTicket(index, 'name', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="whitespace-nowrap">Ticket Type *</Label>
                  <div className="flex-1">
                    <TicketTypeSelect
                      value={ticket.type} 
                      onValueChange={(value: 'single' | 'pass' | 'group') => {
                        updateTicket(index, 'type', value);
                        // Clear selected dates when changing type
                        updateTicket(index, 'selectedDates', []);
                      }}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base font-semibold mb-4">Pricing</h3>
                <div className="grid grid-cols-2 gap-6">
                  {isFreeEvent ? (
                    <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <span>This is a free event. No ticket price required.</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 flex-1">
                        <Label className="whitespace-nowrap">Price (VAT incl.) *</Label>
                        <div className="flex-1">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              className="pl-7"
                              placeholder="0.00"
                              value={ticket.basePrice}
                              onChange={(e) => updateTicket(index, 'basePrice', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <Label className="whitespace-nowrap">961 Deals</Label>
                          <div className={cn("relative group", parseFloat(ticket.basePrice) === 0 && "opacity-50")}>
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                              Get more ticket sales by offering a deal to 961 Deals members.
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="relative">
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="1"
                              className="pr-7"
                              placeholder="0"
                              value={ticket.dealDiscount}
                              onChange={(e) => updateTicket(index, 'dealDiscount', e.target.value)}
                              disabled={parseFloat(ticket.basePrice) === 0}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {!isFreeEvent && ticket.basePrice && parseFloat(ticket.basePrice) > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ticket Price</span>
                      <span>${parseFloat(ticket.basePrice).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>${(parseFloat(ticket.basePrice) * 0.035 + 1.29).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Payment Cost</span>
                      <span>${(parseFloat(ticket.basePrice) * 0.035 + 0.35).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${(
                        parseFloat(ticket.basePrice) + 
                        (parseFloat(ticket.basePrice) * 0.035 + 1.29) + 
                        (parseFloat(ticket.basePrice) * 0.035 + 0.35)
                      ).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-base font-semibold mb-4">Availability</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-4">
                    <div className="flex items-center gap-4">
                      <Label className="whitespace-nowrap">Sale Start *</Label>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !ticket.saleStartDate && "text-muted-foreground"
                              )}
                            >
                              {ticket.saleStartDate ? format(ticket.saleStartDate, 'PPP') : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={ticket.saleStartDate}
                              onSelect={(date) => updateTicket(index, 'saleStartDate', date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <TimePicker
                          date={ticket.saleStartTime ? new Date(ticket.saleStartTime) : undefined}
                          setDate={(date) => updateTicket(index, 'saleStartTime', date.toISOString())}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="whitespace-nowrap">Sale End *</Label>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !ticket.saleEndDate && "text-muted-foreground"
                              )}
                            >
                              {ticket.saleEndDate ? format(ticket.saleEndDate, 'PPP') : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={ticket.saleEndDate}
                              onSelect={(date) => updateTicket(index, 'saleEndDate', date)}
                              disabled={(date) => date < (ticket.saleStartDate || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <TimePicker
                          date={ticket.saleEndTime ? new Date(ticket.saleEndTime) : undefined}
                          setDate={(date) => updateTicket(index, 'saleEndTime', date.toISOString())}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <Label className="whitespace-nowrap">Total Available *</Label>
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="1"
                        placeholder="Enter quantity"
                        value={ticket.quantity}
                        onChange={(e) => updateTicket(index, 'quantity', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-1">
                    <Label className="whitespace-nowrap">Max. Tickets Per Order</Label>
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="1"
                        placeholder="Enter limit"
                        value={ticket.maxPerOrder}
                        onChange={(e) => updateTicket(index, 'maxPerOrder', e.target.value)}
                      />
                    </div>
                  </div>

                  {ticket.type === 'group' && (
                    <div className="space-y-2">
                      <Label>Group Size *</Label>
                      <Input
                        type="number"
                        min="2"
                        placeholder="Number of people per group"
                        value={ticket.groupSize}
                        onChange={(e) => updateTicket(index, 'groupSize', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Event Dates *</Label>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {ticket.selectedDates.length} date{ticket.selectedDates.length !== 1 ? 's' : ''} selected
                      </Badge>
                    </div>
                    <div className="grid gap-2">
                      {timeSlots.map((slot, slotIndex) => {
                        if (!slot.startDate || !slot.endDate) return null;
                        const startDate = new Date(slot.startDate);
                        const endDate = new Date(slot.endDate);
                        const isSelected = ticket.selectedDates.some(date => {
                          const d = new Date(date);
                          return d >= startDate && d <= endDate;
                        });
                        
                        return (
                          <div
                            key={slotIndex}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                              isSelected 
                                ? "bg-red-50 border-red-200 hover:bg-red-100" 
                                : "hover:bg-gray-50"
                            )}
                            onClick={() => {
                              const dateRange = [];
                              let currentDate = new Date(startDate);

                              if (isSelected) {
                                // Remove this date range
                                const newDates = ticket.selectedDates.filter(date => {
                                  const d = new Date(date);
                                  return d < startDate || d > endDate;
                                });
                                updateTicket(index, 'selectedDates', newDates);
                              } else {
                                // Add this date range
                                while (currentDate <= endDate) {
                                  dateRange.push(new Date(currentDate));
                                  currentDate.setDate(currentDate.getDate() + 1);
                                }
                                updateTicket(
                                  index,
                                  'selectedDates',
                                  [...ticket.selectedDates, ...dateRange.map(d => d.toISOString())]
                                );
                              }
                            }}
                          >
                            <div className="space-y-1">
                              <div className="font-medium">
                                {format(startDate, 'PPP')}
                                {!slot.isLate && (
                                  <>
                                    <span className="text-muted-foreground">
                                      {' '}{format(startDate, 'p')}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {' '}till{' '}
                                    </span>
                                    {slot.isLate ? (
                                      <span>Late</span>
                                    ) : (
                                      <span className="text-muted-foreground">
                                        {format(endDate, 'p')}
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                              {startDate.toDateString() !== endDate.toDateString() && (
                                <div className="text-sm text-muted-foreground">
                                  Until {format(endDate, 'PPP')}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                                Selected
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full gap-2 border-dashed"
          onClick={addTicket}
        >
          <Plus className="h-4 w-4" />
          Add Ticket
        </Button>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={() => onNext(tickets)}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export { CreateTicketsPage }