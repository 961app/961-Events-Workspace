import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard, Ticket, Mic2, Users, Monitor } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Event } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EventSidebarProps {
  event: Event;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onBack: () => void;
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'attendees', label: 'Attendees', icon: Users },
  { id: 'artists', label: 'Lineup', icon: Mic2 },
  { id: 'media', label: 'Media Partner', icon: Monitor }
];

export function EventSidebar({ event, activeSection, onSectionChange, onBack }: EventSidebarProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [cancelText, setCancelText] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState<Date | undefined>(undefined);

  const handleCancelConfirm = () => {
    if (cancelText.toLowerCase() === 'cancel') {
      setShowConfirmDialog(false);
      // Here you would handle the actual cancellation and refund
    }
  };

  return (
    <aside className="w-64 shrink-0 min-h-screen p-4 sticky top-16 bg-white border-r">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Button>

      <div className="mb-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-full aspect-video rounded-lg object-cover bg-gray-100"
        />
        <h2 className="font-bold text-base line-clamp-2 mt-4">{event.title}</h2>
      </div>

      <div className="space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 h-11',
              activeSection === item.id && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
              'focus:ring-0 focus-visible:ring-0 focus:outline-none'
            )}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className={cn('h-5 w-5', activeSection === item.id && 'text-[#FF0000]')} />
            {item.label}
          </Button>
        ))}
      </div>
      
      {(event.status === 'ON SALE' || event.status === 'DRAFT') && (
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="ghost" 
            className="w-full justify-start h-11 text-muted-foreground hover:text-foreground"
          >
            Edit Event
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-11 text-muted-foreground hover:text-foreground"
            onClick={() => setShowRescheduleDialog(true)}
          >
            Reschedule Event
          </Button>
          {event.status === 'ON SALE' && (
          <Button
            variant="ghost"
            className="w-full justify-start h-11 text-muted-foreground hover:text-foreground"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel Event
          </Button>
          )}
        </div>
      )}

      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Event</DialogTitle>
            <DialogDescription>
              Select a new date and time for your event. All ticket holders will be notified of the change.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newDate && "text-muted-foreground"
                    )}
                  >
                    {newDate ? format(newDate, 'PPP') : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>New Time</Label>
              <TimePicker date={newTime} setDate={setNewTime} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle rescheduling logic here
                setShowRescheduleDialog(false);
              }}
              disabled={!newDate || !newTime}
            >
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Event and Refund</DialogTitle>
            <DialogDescription>
              This will notify all users that the event is cancelled and will automatically refund all ticket holders.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              No, keep event
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setShowCancelDialog(false);
                setShowConfirmDialog(true);
              }}
            >
              Yes, cancel event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              To confirm cancellation, please type "cancel" below.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={cancelText}
            onChange={(e) => setCancelText(e.target.value)}
            placeholder="Type 'cancel' to confirm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Go back
            </Button>
            <Button
              variant="destructive"
              disabled={cancelText.toLowerCase() !== 'cancel'}
              onClick={handleCancelConfirm}
            >
              Cancel Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}