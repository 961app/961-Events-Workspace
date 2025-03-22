import { EventHeader } from './events/EventHeader';
import { EventSidebar } from './events/EventSidebar';
import { EventStats } from './events/EventStats';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpDown, Download, MoreHorizontal, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/types';
import { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Attendee } from '@/types';
import { TicketsPage } from './tickets/TicketsPage';
import { ArtistsPage } from './artists/ArtistsPage';
import { MediaPartnerPage } from './media/MediaPartnerPage';

const checkInData = [
  { name: 'Ticket', value: 82, color: '#FF0000' },
  { name: 'Face', value: 12, color: '#374151' },
  { name: 'Manual', value: 6, color: '#9CA3AF' }
];

const genderData = [
  { name: 'Women', value: 58, color: '#FF0000' },
  { name: 'Men', value: 42, color: '#374151' }
];

const ageData = [
  { age: '<18', value: 5 },
  { age: '18-24', value: 28 },
  { age: '25-34', value: 42 },
  { age: '35-44', value: 18 },
  { age: '45-54', value: 8 },
  { age: '55+', value: 3 }
];

const attendees: Attendee[] = Array.from({ length: 50 }, (_, i) => ({
  id: `attendee-${i + 1}`,
  name: ['Emma Wilson', 'Liam Johnson', 'Sophia Garcia', 'Oliver Brown', 'Ava Martinez'][i % 5],
  username: ['@emmaw', '@liamj', '@sophiag', '@oliverb', '@avam'][i % 5],
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
  tickets: [
    {
      name: ['Early Bird', 'Regular', 'VIP'][Math.floor(Math.random() * 3)],
      quantity: Math.floor(Math.random() * 2) + 1,
      price: [25, 35, 50][Math.floor(Math.random() * 3)],
      assignedTo: Math.random() > 0.7 ? '@friend' + (i + 1) : undefined
    }
  ],
  status: Math.random() > 0.3 ? 'SCANNED' : 'NOT_SCANNED',
  type: ['TICKET', 'PRIVATE', 'INVITE'][Math.floor(Math.random() * 3)]
}));

interface TicketType {
  name: string;
  price: number;
  sold: number;
  total: number;
}

const ticketTypes: TicketType[] = [
  { name: 'Early Bird', price: 25, sold: 100, total: 100 },
  { name: 'Regular', price: 35, sold: 150, total: 200 },
  { name: 'VIP', price: 50, sold: 25, total: 50 }
];

const totalAttendees = 270;

const attendeeProfiles = [
  { label: 'New followers', value: 124, isQuantity: true },
  { label: 'First-time buyers', value: 89, isQuantity: false },
  { label: 'Attended 1 event', value: 45, isQuantity: false },
  { label: 'Attended 2+ events', value: 12, isQuantity: false }
];

interface EventPageProps {
  event: Event;
  onBack: () => void;
  initialSection?: string;
}

export function EventPage({ event, onBack, initialSection = 'overview' }: EventPageProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Attendee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [attendeesList, setAttendeesList] = useState(attendees);

  const handleCheckIn = useCallback((attendeeId: string) => {
    setAttendeesList(prev => prev.map(attendee => 
      attendee.id === attendeeId 
        ? { ...attendee, status: 'SCANNED' }
        : attendee
    ));
  }, []);

  const averageAge = ageData.reduce((acc, curr) => {
    const [min, max] = curr.age.split('-').map(n => parseInt(n) || 55);
    return acc + ((min + max) / 2 * curr.value);
  }, 0) / 100;

  const stats = [
    { 
      label: 'Tickets Sold',
      value: event.tickets
    },
    { 
      label: 'Conversion',
      value: '3.2%'
    },
    { 
      label: 'Total Revenue',
      value: `$${event.revenue.toLocaleString()}`
    },
    { 
      label: 'No-Show Rate',
      value: '2.1%'
    },
    { 
      label: 'Resale Rev',
      value: '$180'
    }
  ];

  const handleSort = (field: keyof Attendee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAttendees = attendeesList.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAttendees = [...filteredAttendees].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    }
    return multiplier * (a[sortField] > b[sortField] ? 1 : -1);
  });

  return (
    <div className="flex min-h-screen">
      <EventSidebar
        event={event}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onBack={onBack}
      />
      <Separator orientation="vertical" className="h-screen" />
      <div className="flex-1 max-w-[1088px] mx-auto space-y-8 px-8 pb-8">
        <EventHeader event={event} />

        {activeSection === 'overview' && (
              <>
                <EventStats event={event} />
                <div className="grid grid-cols-2 gap-4">                    
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Ticket Sales breakdown</h2>
                    <div className="space-y-2">
                      {ticketTypes.map((ticket, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-4">
                            <span className="font-semibold">{ticket.name}</span>
                            <span className="text-muted-foreground">${ticket.price}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">{ticket.sold}</span>
                            <span className="text-muted-foreground text-sm">/</span>
                            <span className="text-muted-foreground text-sm">{ticket.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                
                <Card className="p-6 space-y-6">
                  <h2 className="text-lg font-semibold">People</h2>
                  <div className="grid grid-cols-4 gap-4">
                    {attendeeProfiles.map((profile) => (
                      <div key={profile.label} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">{profile.label}</h3>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold">{profile.value}</p>
                          {!profile.isQuantity && <span className="text-sm text-muted-foreground">%</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold">Gender</h2>
                    <div className="h-[300px]">
                      <div className="flex justify-center gap-8 mb-4">
                        {genderData.map((entry) => (
                          <div key={entry.name} className="text-center">
                            <div className="text-3xl font-bold" style={{ color: entry.color }}>
                              {entry.value}%
                            </div>
                            <div className="text-sm text-muted-foreground">{entry.name}</div>
                          </div>
                        ))}
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={genderData}
                            innerRadius="70%"
                            outerRadius="90%"
                            paddingAngle={1}
                            dataKey="value"
                          >
                            {genderData.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconType="circle"
                            iconSize={8}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold">Age</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your attendees are {averageAge.toFixed(1)} years old on average
                    </p>
                    <div className="h-[250px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <YAxis 
                            dataKey="age" 
                            type="category" 
                            width={60}
                            axisLine={false}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#FF0000" 
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                            label={{
                              position: 'right',
                              formatter: (value: number) => `${value}%`,
                              fill: '#6B7280',
                              fontSize: 12
                            }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
                
                <Card className="p-6">
                  <h2 className="text-lg font-semibold">Check-in Method</h2>
                  <div className="h-[300px]">
                    <div className="flex justify-center gap-8 mb-4">
                      {checkInData.map((entry) => (
                        <div key={entry.name} className="text-center">
                          <div className="text-3xl font-bold" style={{ color: entry.color }}>
                            {entry.value}%
                          </div>
                          <div className="text-sm text-muted-foreground">{entry.name}</div>
                        </div>
                      ))}
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={checkInData}
                          innerRadius="70%"
                          outerRadius="90%"
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {checkInData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend
                          verticalAlign="middle"
                          align="right"
                          layout="vertical"
                          iconType="circle"
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </>
        )}
        
        {activeSection === 'tickets' && <TicketsPage />}
        {activeSection === 'artists' && <ArtistsPage />}
        {activeSection === 'media' && <MediaPartnerPage />}
        
        {activeSection === 'attendees' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Search attendees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[300px]"
                    />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All tickets</SelectItem>
                        <SelectItem value="early">Early Bird</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="scanned">Scanned</SelectItem>
                        <SelectItem value="not_scanned">Not Scanned</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="ticket">Ticket</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="invite">Invite</SelectItem>
                        <SelectItem value="creator">Creator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium">
                    <Button variant="ghost" onClick={() => handleSort('name')} className="flex items-center gap-2">
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleSort('purchaseDate')} className="flex items-center gap-2">
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      Tickets
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      Status
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      Type
                    </Button>
                    <div className="w-8" />
                  </div>

                  {sortedAttendees.map((attendee) => (
                    <div
                      key={attendee.id}
                      className="space-y-2"
                    >
                      <div
                        className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setExpanded({ ...expanded, [attendee.id]: !expanded[attendee.id] })}
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
                        <div className="flex items-center">
                          <span className="text-sm">{attendee.purchaseDate}</span>
                        </div>
                        <div className="flex items-center">
                          {attendee.tickets.map((ticket, i) => (
                            <span key={i} className="text-sm">
                              {ticket.quantity > 1 ? `${ticket.quantity}x ` : ''}{ticket.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs px-2 py-0.5", attendee.status === 'SCANNED' 
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            )} 
                          >
                            <span className="text-xs">{attendee.status === 'SCANNED' ? 'Scanned' : 'Not Scanned'}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs px-2 py-0.5",
                              attendee.type === 'TICKET' && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                              attendee.type === 'PRIVATE' && "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
                              attendee.type === 'INVITE' && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
                              attendee.type === 'CREATOR' && "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            )}
                          >
                            {attendee.type}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {attendee.status === 'NOT_SCANNED' && (
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheckIn(attendee.id);
                                  }}
                                  className="text-green-600"
                                >
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Check In
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>Refund</DropdownMenuItem>
                              <DropdownMenuItem>Cancel & Refund</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      {expanded[attendee.id] && (
                        <div className="px-4 py-3 ml-14 bg-gray-50 rounded-lg space-y-3">
                          {attendee.tickets.map((ticket, i) => (
                            <div key={i} className={cn("space-y-2", i > 0 && "border-t pt-3")}>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="font-medium">#{attendee.id}-${i + 1}</span>
                                <span className="font-medium">{ticket.name}</span>
                                <span className="text-muted-foreground">${ticket.price}</span>
                              </div>
                              {Array.from({ length: ticket.quantity }, (_, j) => (
                                <div key={j} className="ml-4 flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Ticket {j + 1}</span>
                                    {ticket.assignedTo && (
                                      <>
                                        <span className="text-muted-foreground">·</span>
                                        <div className="flex items-center gap-2">
                                          <Avatar className="h-5 w-5">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${attendee.id}-${j}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                          </Avatar>
                                          <span className="font-medium">{ticket.assignedTo}</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
        )}
      </div>
    </div>
  );
}