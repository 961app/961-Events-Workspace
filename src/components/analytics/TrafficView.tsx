import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Heart, Send, UserPlus, Globe, Instagram, Facebook, Search } from 'lucide-react';
import { StatsCard } from './shared/StatsCard';
import { ProgressList, type ProgressItem } from './shared/ProgressList';
import { VisitsChart } from './shared/VisitsChart';

interface PageVisit {
  page: string;
  title: string;
  visits: number;
  todayVisits: number;
  image?: string;
}

interface DailyVisits {
  date: string;
  visits: number;
}

const pages: PageVisit[] = [
  {
    page: 'all',
    title: 'All Pages',
    visits: 24500,
    todayVisits: 1250
  },
  {
    page: 'organizer',
    title: 'Beirut House Community',
    visits: 12300,
    todayVisits: 680,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    page: 'event-1',
    title: 'TROIS PIRATE, DÉBARQUENT SUR SEINE',
    visits: 8200,
    todayVisits: 420,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    page: 'event-2',
    title: 'Beirut House Community - Paris Cruise Edition',
    visits: 4000,
    todayVisits: 150,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

const dailyVisits: DailyVisits[] = [
  { date: 'Mar 1', visits: 1200 },
  { date: 'Mar 2', visits: 1400 },
  { date: 'Mar 3', visits: 1100 },
  { date: 'Mar 4', visits: 1600 },
  { date: 'Mar 5', visits: 1800 },
  { date: 'Mar 6', visits: 2100 },
  { date: 'Mar 7', visits: 1900 },
  { date: 'Mar 8', visits: 2300 },
  { date: 'Mar 9', visits: 2500 },
  { date: 'Mar 10', visits: 2200 },
  { date: 'Mar 11', visits: 2400 },
  { date: 'Mar 12', visits: 2800 },
  { date: 'Mar 13', visits: 3000 },
  { date: 'Mar 14', visits: 2700 }
];

const actionStats: ProgressItem[] = [
  {
    icon: Heart,
    label: 'Click on "interested"',
    count: 3680,
    total: 24500
  },
  {
    icon: Ticket,
    label: 'Buy tickets',
    count: 824,
    total: 24500
  },
  {
    icon: UserPlus,
    label: 'Followed',
    count: 1230,
    total: 24500
  },
  {
    icon: Send,
    label: 'Shared',
    count: 456,
    total: 24500
  }
];

const trafficSources: ProgressItem[] = [
  {
    icon: Globe,
    label: '961',
    count: 12250,
    total: 24500
  },
  {
    icon: Instagram,
    label: 'Instagram',
    count: 6125,
    total: 24500
  },
  {
    icon: Globe,
    label: 'Direct',
    count: 3675,
    total: 24500
  },
  {
    icon: Facebook,
    label: 'Facebook',
    count: 1470,
    total: 24500
  },
  {
    icon: Search,
    label: 'Search',
    count: 980,
    total: 24500
  }
];

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function TrafficView() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Traffic</h1>
        
        <Select defaultValue={selectedPage.page} onValueChange={(value) => {
          const page = pages.find(p => p.page === value);
          if (page) setSelectedPage(page);
        }}>
          <SelectTrigger className="w-[400px]">
            <SelectValue>
              <div className="flex items-center gap-3">
                {selectedPage.image && (
                  <img
                    src={selectedPage.image}
                    alt={selectedPage.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                )}
                <span className="font-medium">{selectedPage.title}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.page} value={page.page}>
                <div className="flex items-center gap-3 py-1">
                  {page.image && (
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <span className="font-medium">{page.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <StatsCard
            title="Total Visits"
            value={formatNumber(selectedPage.visits)}
            description="All time visits"
          />
        </Card>
        <Card>
          <StatsCard
            title="Today's Visits"
            value={formatNumber(selectedPage.todayVisits)}
            description="Visits in the last 24 hours"
          />
        </Card>
      </div>

      <Card className="p-6">
        <VisitsChart data={dailyVisits} />
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Which actions are performed during visits?</h2>
        <ProgressList items={actionStats} />
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Where are visits coming from?</h2>
        <ProgressList items={trafficSources} />
      </Card>
    </div>
  );
}