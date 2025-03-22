import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnalyticsHeader } from './shared/AnalyticsHeader';
import { events } from './SalesOverview';
import { ArrowUpDown, ArrowLeft, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Attendee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  eventsAttended: number;
  ltv: number;
  avgSpend: number;
}

interface AttendeesListProps {
  onBack: () => void;
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

const sidebarItems = [
  { icon: BarChart3, label: 'Sales' },
  { icon: TrendingUp, label: 'Traffic' },
  { icon: Users, label: 'People' }
];

const attendees: Attendee[] = Array.from({ length: 50 }, (_, i) => ({
  id: `attendee-${i + 1}`,
  name: ['Emma Wilson', 'Liam Johnson', 'Sophia Garcia', 'Oliver Brown', 'Ava Martinez'][i % 5],
  username: ['@emmaw', '@liamj', '@sophiag', '@oliverb', '@avam'][i % 5],
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  eventsAttended: Math.floor(Math.random() * 5) + 1,
  ltv: Math.floor(Math.random() * 900) + 100,
  avgSpend: Math.floor(Math.random() * 60) + 20
}));

type SortField = 'name' | 'eventsAttended' | 'ltv' | 'avgSpend';
type SortDirection = 'asc' | 'desc';

export function AttendeesList({ onBack, activeSection = 'People', onNavigate }: AttendeesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('ltv');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAndFilteredAttendees = attendees
    .filter(attendee => 
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return multiplier * a.name.localeCompare(b.name);
      }
      return multiplier * (a[sortField] - b[sortField]);
    });

  const totalPages = Math.ceil(sortedAndFilteredAttendees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttendees = sortedAndFilteredAttendees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="w-48 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 h-11',
                activeSection === item.label && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
                'focus:ring-0 focus-visible:ring-0 focus:outline-none'
              )}
              onClick={() => {
                if (item.label === 'People') {
                  onBack?.();
                } else {
                  onNavigate?.(item.label);
                }
              }}
            >
              <item.icon className={cn('h-5 w-5', activeSection === item.label && 'text-[#FF0000]')} />
              {item.label}
            </Button>
          ))}
        </aside>

        <div className="flex-1 pl-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to People
            </Button>
          </div>
          
          <AnalyticsHeader 
            title="Attendees" 
            events={[
              { id: 'all', title: 'All events', date: '', status: '', image: events[0].image },
              ...events
            ]} 
            defaultValue="all" 
          />

          <Card className="p-6 mt-8">
            <div className="mb-6">
              <Input
                placeholder="Search attendees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="space-y-1">
              <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium">
                <Button variant="ghost" onClick={() => handleSort('name')} className="flex items-center gap-2">
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => handleSort('eventsAttended')} className="flex items-center gap-2">
                  Events
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => handleSort('ltv')} className="flex items-center gap-2">
                  LTV
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => handleSort('avgSpend')} className="flex items-center gap-2">
                  Avg. Spend
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {paginatedAttendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setExpanded({ ...expanded, [attendee.id]: !expanded[attendee.id] })}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={attendee.avatar} />
                      <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{attendee.name}</p>
                      <p className="text-xs text-muted-foreground">{attendee.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{attendee.eventsAttended}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-sm">${attendee.ltv}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-sm">${attendee.avgSpend}</span>
                  </div>
                  {expanded[attendee.id] && (
                    <div className="col-span-4 mt-4 pl-14 space-y-3">
                      <h4 className="font-medium text-sm">Recent Events</h4>
                      <div className="space-y-2">
                        {Array.from({ length: attendee.eventsAttended }, (_, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <img
                              src={events[i % events.length].image}
                              alt={events[i % events.length].title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{events[i % events.length].title}</p>
                              <p className="text-muted-foreground">{events[i % events.length].date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedAndFilteredAttendees.length)} of {sortedAndFilteredAttendees.length} attendees
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground disabled:opacity-50"
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
