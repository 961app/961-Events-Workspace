import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, AlertTriangle, Plus, X } from 'lucide-react';
import { format, addHours } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimeSlot {
  id: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isLate: boolean;
}

export type { TimeSlot };

interface EventSchedulePageProps {
  onBack: () => void;
  onNext: (timeSlots: TimeSlot[]) => void;
}

function EventSchedulePage({ onBack, onNext }: EventSchedulePageProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      startDate: new Date(),
      endDate: addHours(new Date(), 2),
      isLate: false
    }
  ]);

  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      {
        id: String(timeSlots.length + 1),
        startDate: undefined,
        endDate: undefined,
        isLate: false
      }
    ]);
  };

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    }
  };

  const updateTimeSlot = (id: string, field: keyof TimeSlot, value: string | boolean) => {
    setTimeSlots(timeSlots.map(slot =>
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'PPP');
  };

  const handleDateSelect = (id: string, field: 'startDate' | 'endDate', date: Date) => {
    const slot = timeSlots.find(s => s.id === id);
    if (slot) {
      const newDate = date;
      updateTimeSlot(id, field, newDate);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Event Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">Set up your event's schedule and time slots</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={() => {
              const validSlots = timeSlots.filter(slot => slot.startDate && slot.endDate);
              if (validSlots.length > 0) {
                onNext(validSlots);
              }
            }}
            disabled={!timeSlots.some(slot => slot.startDate && slot.endDate)}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          {timeSlots.map((slot, index) => (
            <div 
              key={slot.id} 
              className={cn(
                "space-y-6 rounded-xl border bg-card p-6",
                index > 0 && "mt-8"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-base font-semibold">Day {index + 1}</div>
                </div>
                {timeSlots.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                    onClick={() => removeTimeSlot(slot.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label className="text-base font-semibold w-16">Start *</Label>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !slot.startDate && "text-muted-foreground border-red-200 hover:border-red-300"
                            )}
                          >
                            {slot.startDate ? formatDate(slot.startDate) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={slot.startDate}
                            onSelect={(date) => date && handleDateSelect(slot.id, 'startDate', date)}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Select
                        value={slot.startDate ? format(slot.startDate, 'HH:mm') : undefined}
                        onValueChange={(time) => {
                          const [hours, minutes] = time.split(':').map(Number);
                          const date = slot.startDate || new Date();
                          date.setHours(hours, minutes);
                          updateTimeSlot(slot.id, 'startDate', date);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {format(new Date().setHours(
                                parseInt(time.split(':')[0]),
                                parseInt(time.split(':')[1])
                              ), 'h:mm a')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label className="text-base font-semibold w-16">End *</Label>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="space-y-2">
                        <Popover disabled={slot.isLate}>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !slot.endDate && "text-muted-foreground border-red-200 hover:border-red-300",
                                slot.isLate && "opacity-50 cursor-not-allowed"
                              )}
                              disabled={slot.isLate}
                            >
                              {slot.isLate ? "Not required" : slot.endDate ? formatDate(slot.endDate) : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={slot.endDate}
                              onSelect={(date) => date && handleDateSelect(slot.id, 'endDate', date)}
                              disabled={(date) =>
                                date < (slot.startDate || new Date())
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Select
                          disabled={slot.isLate}
                          value={slot.endDate ? format(slot.endDate, 'HH:mm') : undefined}
                          onValueChange={(time) => {
                            const [hours, minutes] = time.split(':').map(Number);
                            const date = slot.endDate || addHours(slot.startDate || new Date(), 2);
                            date.setHours(hours, minutes);
                            updateTimeSlot(slot.id, 'endDate', date);
                          }}
                        >
                          <SelectTrigger className={cn(slot.isLate && "opacity-50 cursor-not-allowed")}>
                            <SelectValue placeholder={slot.isLate ? "Not required" : "Select time"} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {format(new Date().setHours(
                                  parseInt(time.split(':')[0]),
                                  parseInt(time.split(':')[1])
                                ), 'h:mm a')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">or</span>
                    <Button
                      variant={slot.isLate ? 'default' : 'outline'}
                      className={cn( 
                        "justify-start gap-2 text-left h-[40px]",
                        slot.isLate && "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                      )}
                      onClick={() => updateTimeSlot(slot.id, 'isLate', !slot.isLate)}
                    >
                      Late
                    </Button>
                    {!slot.startDate && !slot.endDate && !slot.isLate && (
                      <div className="absolute -bottom-6 left-0 text-sm text-red-600">
                        Please select dates or mark as Late
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full gap-2 mt-4 border-dashed"
            onClick={addTimeSlot}
          >
            <Plus className="h-4 w-4" />
            Add Day
          </Button>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Please fill in all required fields (*)</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button 
              disabled={!timeSlots.some(slot => slot.startDate && slot.endDate)}
              className="gap-2 bg-[#FF0000] hover:bg-red-600"
              onClick={() => {
                const validSlots = timeSlots.filter(slot => slot.startDate && slot.endDate);
                if (validSlots.length > 0) {
                  onNext(validSlots);
                }
              }}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EventSchedulePage };