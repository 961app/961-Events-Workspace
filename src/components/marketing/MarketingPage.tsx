import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Newspaper, Users, Star, MessageSquare, Building2 } from 'lucide-react';
import { ReviewSection } from './ReviewSection';
import { CreatorProgramPage } from './creator/CreatorProgramPage';
import { ContentPage } from './content/ContentPage';
import { AdvertisePage } from './advertise/AdvertisePage';
import { NineOneSixPage } from './961/NineOneSixPage';
import { EventSelector, type MarketingEvent } from './shared/EventSelector';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const events: MarketingEvent[] = [
  {
    id: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    date: 'Mar 28, 2025',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    date: 'Feb 25, 2025',
    status: 'ON SALE',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'event-3',
    title: 'BATEAU MOVE x CIAO HABIBI MILAN',
    date: 'Feb 22, 2025',
    status: 'CANCELLED',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

interface MarketingSection {
  id: 'advertise' | 'content' | 'creator' | 'review' | '961';
  label: string;
  icon: typeof Megaphone;
  description: string;
}

const sections: MarketingSection[] = [
  {
    id: 'advertise',
    label: 'Advertise',
    icon: Megaphone,
    description: 'Promote your event across our platform and reach thousands of potential attendees'
  },
  {
    id: 'content',
    label: 'Content',
    icon: Newspaper,
    description: 'Get featured in our editorial content and social media channels'
  },
  {
    id: 'creator',
    label: 'Creator Program',
    icon: Star,
    description: 'Partner with our network of creators to amplify your event'
  },
  {
    id: 'review',
    label: 'Review',
    icon: MessageSquare,
    description: 'Manage and respond to event reviews'
  },
  {
    id: '961',
    label: '961',
    icon: Building2,
    description: 'Invite 961 team members to your events'
  }
];

export function MarketingPage() {
  const [selectedEvent, setSelectedEvent] = useState(events[0].id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <EventSelector
          events={events}
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
        />
      </div>
      
      <Tabs defaultValue="advertise" className="space-y-6">
        <TabsList className="h-12 w-full justify-start gap-2">
        {sections.map((section) => (
          <TabsTrigger
            key={section.id}
            value={section.id}
            className="data-[state=active]:bg-[#FF0000] data-[state=active]:text-white"
          >
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section) => (
        <TabsContent key={section.id} value={section.id}>
          <Card className={cn("p-8", section.id === 'content' && "p-0", section.id === 'review' && "p-0")}>
            <div className={cn(
              "max-w-2xl",
              (section.id === 'review' || section.id === 'content') && "max-w-none"
            )}>
              {section.id === 'review' ? (
                <ReviewSection />
              ) : section.id === 'creator' ? (
                <CreatorProgramPage />
              ) : section.id === 'content' ? (
                <ContentPage />
              ) : section.id === '961' ? (
                <NineOneSixPage />
              ) : section.id === 'advertise' ? (
                <AdvertisePage />
              ) : (
                <div />
              )}
            </div>
          </Card>
        </TabsContent>
      ))}
      </Tabs>
    </div>
  );
}