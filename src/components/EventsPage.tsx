import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterTabs, type FilterTab } from '@/components/FilterTabs';
import { CreateTicketsPage } from './tickets/CreateTicketsPage';
import { CreateEventPage } from './events/CreateEventPage';
import { EventSchedulePage } from './events/EventSchedulePage';
import { Button } from '@/components/ui/button';
import { EventsList } from '@/components/EventsList';
import { LiveEventPage } from '@/components/LiveEventPage';
import { EventPage } from '@/components/EventPage';
import type { Event } from '@/types';
import { AddonsPage } from '@/components/tickets/AddonsPage';
import { TicketConfirmation } from './tickets/TicketConfirmation';
import { TimeSlot } from '@/components/events/EventSchedulePage';

const events: Event[] = [
  {
    id: 'event-0',
    title: 'OTTMANN & Friends - Live from Paris',
    date: 'Today, 8:00 PM',
    dateObj: new Date(),
    revenue: 3600,
    tickets: 120,
    progress: 100,
    status: 'LIVE',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    date: 'Fri, Mar 28, 2025 8:00 PM',
    dateObj: new Date('2025-03-28T20:00:00'),
    revenue: 60,
    tickets: 2,
    progress: 3,
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    date: 'Tue, Feb 25, 2025 8:00 PM',
    dateObj: new Date('2025-02-25T20:00:00'),
    revenue: 2028,
    tickets: 82,
    progress: 75,
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-3',
    title: 'BATEAU MOVE x CIAO HABIBI MILAN',
    date: 'Sat, Feb 22, 2025 1:00 PM',
    dateObj: new Date('2025-02-22T13:00:00'),
    status: 'CANCELLED',
    revenue: 0,
    tickets: 0,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-4',
    title: 'Summer Beach Party 2025',
    date: 'Sun, Jul 15, 2025 2:00 PM',
    dateObj: new Date('2025-07-15T14:00:00'),
    revenue: 0,
    tickets: 0,
    progress: 0,
    status: 'DRAFT',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-5',
    title: 'New Year Eve Celebration',
    date: 'Tue, Dec 31, 2024 10:00 PM',
    dateObj: new Date('2024-12-31T22:00:00'),
    revenue: 4500,
    tickets: 150,
    progress: 100,
    status: 'PAST',
    image: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

const filterTabs: FilterTab[] = [
  { id: 'all', label: 'All', active: true },
  { id: 'published', label: 'Published' },
  { id: 'live', label: 'Live' },
  { id: 'draft', label: 'Draft' },
  { id: 'past', label: 'Past' }
];

function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEventSchedule, setShowEventSchedule] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [eventData, setEventData] = useState({
    timeSlots: [] as TimeSlot[],
    tickets: [] as any[],
    isInitialized: false
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleScheduleNext = (slots: TimeSlot[]) => {
    setEventData(prev => ({
      ...prev,
      timeSlots: slots,
      isInitialized: true
    }));
    setTimeSlots(slots);
    setShowTickets(true);
    setShowEventSchedule(false);
  };

  const handleTicketsNext = (tickets: any[]) => {
    setEventData(prev => ({
      ...prev,
      tickets,
    }));
    setShowTickets(false);
    setShowAddons(true);
  };

  const handleAddonsNext = () => {
    setShowAddons(false);
    setShowConfirmation(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    if (event.status === 'LIVE') {
      setShowLiveEvent(true);
    }
  };

  const [showLiveEvent, setShowLiveEvent] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesTab = true;
    
    switch (activeTab) {
      case 'published':
        matchesTab = event.status === 'ON SALE' || event.status === 'LIVE';
        break;
      case 'live':
        matchesTab = event.status === 'LIVE';
        break;
      case 'draft':
        matchesTab = event.status === 'DRAFT';
        break;
      case 'past':
        matchesTab = event.status === 'PAST' || event.status === 'CANCELLED';
        break;
    }
    
    return matchesSearch && matchesTab;
  });

  const liveEvents = filteredEvents.filter(event => event.status === 'LIVE');
  const publishedEvents = filteredEvents.filter(event => 
    event.status === 'ON SALE'
  );
  const draftEvents = filteredEvents.filter(event => event.status === 'DRAFT');
  const pastEvents = filteredEvents.filter(event => 
    event.status === 'PAST' || event.status === 'CANCELLED'
  );

  return (
    <>
      {showLiveEvent && selectedEvent ? (
        <LiveEventPage
          event={selectedEvent}
          onBack={() => {
            setSelectedEvent(null);
            setShowLiveEvent(false);
          }}
        />
      ) : selectedEvent ? (
        <EventPage 
          event={selectedEvent} 
          onBack={() => setSelectedEvent(null)} 
          initialSection={activeSection}
        />
      ) : (
        showCreateEvent ? (
          showTickets ? (
            <CreateTicketsPage 
              onBack={() => setShowEventSchedule(true)}
              onNext={handleTicketsNext}
              timeSlots={timeSlots}
            /> 
          ) : showAddons ? (
            <AddonsPage
              onBack={() => {
                setShowAddons(false);
                setShowTickets(true);
              }}
              onNext={handleAddonsNext}
              tickets={eventData.tickets}
            />
          ) : showConfirmation ? (
            <TicketConfirmation
              tickets={eventData.tickets}
              onBack={() => {
                setShowConfirmation(false);
                setShowAddons(true);
              }}
              onConfirm={() => {
                // Handle event publishing
                setShowConfirmation(false);
                setShowCreateEvent(false);
              }}
            />
          ) : showEventSchedule ? (
            <EventSchedulePage 
              onBack={() => setShowEventSchedule(false)}
              onNext={handleScheduleNext}
            />
          ) : (
            <CreateEventPage 
              onBack={() => setShowCreateEvent(false)}
              onNext={() => setShowEventSchedule(true)}
            />
          )
        ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Good evening 👋</h1>
            <Button 
              className="bg-[#FF0000] hover:bg-red-600 text-white"
              onClick={() => setShowCreateEvent(true)}
            >
              Create Event
            </Button>
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterTabs 
            tabs={filterTabs.map(tab => ({
              ...tab,
              active: tab.id === activeTab
            }))}
            onTabChange={handleTabChange}
          />

          {liveEvents.length > 0 && activeTab !== 'draft' && activeTab !== 'past' && (
            <EventsList 
              title="Live Now" 
              events={liveEvents} 
              onEventClick={handleEventClick} 
            />
          )}

          {publishedEvents.length > 0 && activeTab !== 'draft' && activeTab !== 'past' && (
            <EventsList 
              title="Published" 
              events={publishedEvents} 
              onEventClick={handleEventClick} 
            />
          )}
          
          {draftEvents.length > 0 && activeTab !== 'published' && activeTab !== 'past' && (
            <EventsList
              title="Draft"
              events={draftEvents}
              onEventClick={handleEventClick}
            />
          )}
      
          {pastEvents.length > 0 && activeTab !== 'published' && activeTab !== 'draft' && (
            <EventsList 
              title="Past" 
              events={pastEvents} 
              isPast 
              onEventClick={handleEventClick} 
            />
          )}
        </div>
        )
      )}
    </>
  );
}

export { EventsPage }