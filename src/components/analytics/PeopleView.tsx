import { Card } from '@/components/ui/card';
import { AnalyticsHeader } from './shared/AnalyticsHeader';
import { events, creators } from './SalesOverview';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const attendanceData = [
  { name: '0 events', value: 0, color: '#94A3B8' },
  { name: '1 event', value: 98.1, color: '#10B981' },
  { name: '2 events', value: 1.9, color: '#FBBF24' },
  { name: '3 events', value: 0, color: '#EC4899' },
  { name: '4+ events', value: 0, color: '#8B5CF6' }
];

const timeSinceLastPurchase = [
  { period: '<3 months', attendees: 4800 },
  { period: '3-6 months', attendees: 2400 },
  { period: '6-12 months', attendees: 1600 },
  { period: '12-24 months', attendees: 800 },
  { period: '24+ months', attendees: 400 }
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

const countryData = [
  { name: 'France', attendees: 4200 },
  { name: 'Belgium', attendees: 1800 },
  { name: 'Switzerland', attendees: 1200 },
  { name: 'Germany', attendees: 900 },
  { name: 'Netherlands', attendees: 750 },
  { name: 'Italy', attendees: 600 },
  { name: 'Spain', attendees: 450 }
];

const cityData = [
  { name: 'Paris', attendees: 3200 },
  { name: 'Lyon', attendees: 850 },
  { name: 'Brussels', attendees: 720 },
  { name: 'Geneva', attendees: 580 },
  { name: 'Marseille', attendees: 450 },
  { name: 'Berlin', attendees: 380 },
  { name: 'Amsterdam', attendees: 320 }
];

const musicGenres = [
  { name: 'House', contacts: 31, percentage: 58.5 },
  { name: 'Melodic House & Techno', contacts: 28, percentage: 52.8 },
  { name: 'Deep House', contacts: 28, percentage: 52.8 },
  { name: 'Afro House', contacts: 26, percentage: 49.1 },
  { name: 'Tech House', contacts: 24, percentage: 45.3 },
  { name: 'Techno', contacts: 23, percentage: 43.4 },
  { name: 'Electro', contacts: 18, percentage: 34.0 }
];

const popularArtists = [
  { name: 'OTTMANN', contacts: 8, percentage: 15.1, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: '&Friends', contacts: 7, percentage: 13.2, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: 'Ahmed Spins', contacts: 7, percentage: 13.2, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: 'OMED', contacts: 7, percentage: 13.2, image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: 'Tripolism', contacts: 6, percentage: 11.3, image: 'https://images.unsplash.com/photo-1521478706270-f2e33c203d95?auto=format&fit=crop&q=80&w=100&h=100' },
  { name: 'Francis Mercier', contacts: 6, percentage: 11.3, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100&h=100' }
];

interface PeopleViewProps {
  onViewAttendees: () => void;
}

export function PeopleView({ onViewAttendees }: PeopleViewProps) {
  // Calculate average age
  const averageAge = ageData.reduce((acc, curr) => {
    const [min, max] = curr.age.split('-').map(n => parseInt(n) || 55);
    return acc + ((min + max) / 2 * curr.value);
  }, 0) / 100;

  return (
    <div className="space-y-8">
      <AnalyticsHeader title="People" events={[
        { id: 'all', title: 'All events', date: '', status: '', image: events[0].image },
        ...events
      ]} defaultValue="all" />
      
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Avg. Order Value</h3>
          <p className="mt-2 text-3xl font-bold mb-2">$38.50</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Tickets per Order</h3>
          <p className="mt-2 text-3xl font-bold mb-2">2.4</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Attendees</h3>
            <button 
              className="text-sm font-medium text-[#FF0000] hover:text-red-700"
              onClick={onViewAttendees}
            >
              View
            </button>
          </div>
          <p className="mt-2 text-3xl font-bold mb-2">10,483</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Followers</h3>
          <p className="mt-2 text-3xl font-bold mb-2">24,129</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Event attendance</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Attended 1.0 of your events on average
          </p>
          
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-5xl font-bold text-[#FF0000]">1.0</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {attendanceData.map((entry) => (
                      <Cell 
                        key={entry.name} 
                        fill={entry.name === '1 event' ? '#FF0000' : entry.color} 
                      />
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
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Time Since Last Purchase</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Distribution of attendees by last purchase date
          </p>
          
          <div className="space-y-4 mt-8">
            {timeSinceLastPurchase.map((period) => (
              <div key={period.period} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{period.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{period.attendees.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((period.attendees / 10000) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                    style={{ width: `${(period.attendees / 10000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
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
                  tickLine={false}
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
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Attendees by Country</h2>
            {countryData.length > 7 && (
              <button className="text-sm font-medium text-[#FF0000] hover:text-red-700">
                View all
              </button>
            )}
          </div>
          <div className="space-y-4">
            {countryData.map((country) => (
              <div key={country.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{country.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{country.attendees.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((country.attendees / 10000) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                    style={{ width: `${(country.attendees / 10000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Attendees by City</h2>
            {cityData.length > 7 && (
              <button className="text-sm font-medium text-[#FF0000] hover:text-red-700">
                View all
              </button>
            )}
          </div>
          <div className="space-y-4">
            {cityData.map((city) => (
              <div key={city.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{city.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{city.attendees.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">
                      ({((city.attendees / 10000) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                    style={{ width: `${(city.attendees / 10000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Creators who attended</h2>
        <div className="space-y-2">
          {creators.slice(0, 10).map((creator) => (
            <div key={creator.id} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-tight">{creator.name}</p>
                  <p className="text-xs text-muted-foreground">{creator.username}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{creator.views.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">followers</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 border-t">
          <span className="text-sm text-muted-foreground">
            Showing 1-10 of {creators.length} creators
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Popular music genres</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Music genres your attendees enjoy
          </p>
          
          <div className="mt-6">
            <div className="h-4"></div>
            
            <div className="space-y-3">
              {musicGenres.map((genre) => (
                <div key={genre.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{genre.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {genre.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                      style={{ width: `${genre.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Page 1 of 7</span>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Popular artists</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Artists your attendees enjoy
          </p>
          
          <div className="mt-6">
            <div className="h-4"></div>
            
            <div className="space-y-3">
              {popularArtists.map((artist) => (
                <div key={artist.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={artist.image} />
                        <AvatarFallback>{artist.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{artist.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {artist.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF0000] rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                      style={{ width: `${artist.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Page 1 of 41</span>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-md text-muted-foreground" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}