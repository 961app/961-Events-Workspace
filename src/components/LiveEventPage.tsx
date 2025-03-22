import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserCheck, ArrowLeft, Ban, AlertTriangle, QrCode, Calendar as CalendarIcon, Pencil, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Event, Attendee } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface LiveEventPageProps {
  event: Event;
  onBack: () => void;
}

const checkInMethods = [
  { id: 'face', label: 'Face', color: 'bg-green-100 text-green-700' },
  { id: 'ticket', label: 'Ticket', color: 'bg-blue-100 text-blue-700' },
  { id: 'manual', label: 'Manual', color: 'bg-amber-100 text-amber-700' }
];

const mockAttendees: Attendee[] = Array.from({ length: 50 }, (_, i) => ({
  id: `attendee-${i + 1}`,
  name: ['Emma Wilson', 'Liam Johnson', 'Sophia Garcia', 'Oliver Brown', 'Ava Martinez'][i % 5],
  username: ['@emmaw', '@liamj', '@sophiag', '@oliverb', '@avam'][i % 5],
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
  checkedInBy: Math.random() > 0.3 ? {
    name: ['Sarah Staff', 'Mike Manager', 'Tom Team'][Math.floor(Math.random() * 3)],
    username: ['@sarahs', '@mikem', '@tomt'][Math.floor(Math.random() * 3)],
    avatar: `https://i.pravatar.cc/150?u=staff${Math.floor(Math.random() * 3) + 1}`,
    method: ['FACE', 'TICKET', 'MANUAL'][Math.floor(Math.random() * 3)],
    timestamp: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000).toLocaleString()
  } : undefined,
  tickets: [
    {
      name: ['Early Bird', 'Regular', 'VIP'][Math.floor(Math.random() * 3)],
      quantity: Math.floor(Math.random() * 2) + 1,
      price: [25, 35, 50][Math.floor(Math.random() * 3)]
    }
  ],
  status: Math.random() > 0.3 ? 'SCANNED' : 'NOT_SCANNED',
  type: ['TICKET', 'PRIVATE', 'INVITE'][Math.floor(Math.random() * 3)]
}));

function LiveEventPage({ event, onBack }: LiveEventPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cancelText, setCancelText] = useState('');
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState<Date | undefined>(undefined);

  const totalTickets = 250;
  const checkedIn = 156;
  const checkinRate = (checkedIn / totalTickets) * 100;

  const handleCancelConfirm = () => {
    if (cancelText.toLowerCase() === 'cancel') {
      setShowConfirmDialog(false);
      // Here you would handle the actual cancellation and refund
    }
  };

  const filteredAttendees = mockAttendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuspend = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setShowSuspendDialog(true);
  };

  const handleBan = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setShowBanDialog(true);
  };

  const handleCheckIn = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setShowCheckInDialog(true);
  };

  const confirmCheckIn = () => {
    // Here you would typically make an API call to check in the attendee
    setShowCheckInDialog(false);
    // For demo purposes, we'll just close the dialog
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 bg-white border-b px-8 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{event.title}</h1>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setShowRescheduleDialog(true)}
                  >
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mt-1">{event.date}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 uppercase">
            Live Now
          </Badge>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex gap-8">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Check-in Rate</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{checkinRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">
                    ({checkedIn} of {totalTickets})
                  </p>
                </div>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${checkinRate}%` }}
                  />
                </div>
              </div>
              
              <div className="border-l pl-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Check-in Methods</h3>
                </div>
                <div className="space-y-3">
                  {checkInMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between gap-3">
                      <span className="text-sm">{method.label}</span>
                      <span className="text-sm font-medium">
                        {((method.count / checkedIn) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search attendees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[300px]"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All attendees</SelectItem>
                  <SelectItem value="checked-in">Checked in</SelectItem>
                  <SelectItem value="not-checked-in">Not checked in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium">
              <div>Attendee</div>
              <div>Checked In</div>
              <div>Staff</div>
              <div>Status</div>
              <div className="w-8" />
            </div>

            {filteredAttendees.map((attendee) => (
              <div
                key={attendee.id}
                className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg items-center"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={attendee.avatar} />
                    <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{attendee.name}</p>
                    <p className="text-sm text-muted-foreground">{attendee.username}</p>
                  </div>
                </div>
                {attendee.checkedInBy ? (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="mx-auto">{new Date(attendee.checkedInBy.timestamp).toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-medium">{attendee.checkedInBy.name}</p>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        attendee.checkedInBy.method === 'FACE' && "bg-blue-50 text-blue-700 border-blue-200",
                        attendee.checkedInBy.method === 'TICKET' && "bg-green-50 text-green-700 border-green-200",
                        attendee.checkedInBy.method === 'MANUAL' && "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        {attendee.checkedInBy.method}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-muted-foreground">-</div>
                    <div className="text-sm text-muted-foreground">-</div>
                  </>
                )}
                <div className="flex items-center justify-center">
                  <Badge variant="outline" className={cn(
                    attendee.checkedInBy
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      : "bg-gray-50 text-gray-700 border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-gray-300",
                  )}>
                    {attendee.checkedInBy ? 'Yes' : ''}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {!attendee.checkedInBy && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleCheckIn(attendee)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    onClick={() => handleSuspend(attendee)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleBan(attendee)}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suspend Attendee</DialogTitle>
              <DialogDescription>
                This will temporarily prevent the attendee from entering the event. They will need to visit the help desk to resolve any issues.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setShowSuspendDialog(false)}>Suspend</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ban Attendee</DialogTitle>
              <DialogDescription>
                This will permanently ban the attendee from the event and prevent them from purchasing tickets in the future. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBanDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setShowBanDialog(false)}>Ban</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manual Check-in</DialogTitle>
              <DialogDescription>
                Are you sure you want to check in {selectedAttendee?.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCheckInDialog(false)}>Cancel</Button>
              <Button onClick={confirmCheckIn}>Check In</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export { LiveEventPage };