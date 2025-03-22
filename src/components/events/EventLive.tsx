import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, QrCode, UserCheck, Users, Clock, Ban, AlertTriangle } from 'lucide-react';
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
} from "@/components/ui/dialog";

interface EventLiveProps {
  event: Event;
}

const checkInMethods = [
  { id: 'face', label: 'Face Recognition', count: 82, color: 'bg-green-100 text-green-700' },
  { id: 'ticket', label: 'Ticket Scan', count: 156, color: 'bg-blue-100 text-blue-700' },
  { id: 'manual', label: 'Manual Check-in', count: 12, color: 'bg-amber-100 text-amber-700' }
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

export function EventLive({ event }: EventLiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const totalTickets = 250;
  const checkedIn = 156;
  const checkinRate = (checkedIn / totalTickets) * 100;

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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Check-in Rate</h3>
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
        </Card>

        {checkInMethods.map(method => (
          <Card key={method.id} className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{method.label}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{method.count}</p>
              <Badge variant="outline" className={method.color}>
                {((method.count / checkedIn) * 100).toFixed(1)}%
              </Badge>
            </div>
          </Card>
        ))}
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
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Check-in method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All methods</SelectItem>
                <SelectItem value="face">Face Recognition</SelectItem>
                <SelectItem value="ticket">Ticket Scan</SelectItem>
                <SelectItem value="manual">Manual Check-in</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <QrCode className="h-4 w-4" />
            Manual Check-in
          </Button>
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
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{attendee.checkedInBy.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={attendee.checkedInBy.avatar} />
                      <AvatarFallback>{attendee.checkedInBy.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
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
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground">-</div>
                  <div className="text-sm text-muted-foreground">-</div>
                </>
              )}
              <div className="flex items-center">
                <Badge variant="outline" className={cn(
                  attendee.checkedInBy
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                )}>
                  {attendee.checkedInBy ? 'Checked In' : 'Not Checked In'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {attendee.status === 'NOT_SCANNED' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <UserCheck className="h-4 w-4" />
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
    </div>
  );
}