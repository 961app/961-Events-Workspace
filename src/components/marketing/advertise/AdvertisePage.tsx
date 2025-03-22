import { useState, type ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Types
interface Campaign {
  id: string;
  type: 'featured' | 'banner';
  status: 'active' | 'ended' | 'scheduled' | 'paused';
  budget: number;
  spent: number;
  views: number;
  clicks: number;
  engagement: {
    interested: number;
    shared: number;
    calendar: number;
    follow: number;
  };
  ticketsSold: number;
  ticketRevenue: number;
  startDate?: Date;
  endDate?: Date;
  image?: string;
}

// Sample data
const activeCampaigns: Campaign[] = [
  {
    id: '1',
    type: 'featured',
    status: 'active',
    budget: 500,
    spent: 320,
    views: 12500,
    clicks: 850,
    engagement: {
      interested: 420,
      shared: 180,
      calendar: 250,
      follow: 150
    },
    ticketsSold: 24,
    ticketRevenue: 720,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31')
  },
  {
    id: '2',
    type: 'banner',
    status: 'active',
    budget: 300,
    spent: 180,
    views: 8200,
    clicks: 620,
    engagement: {
      interested: 280,
      shared: 120,
      calendar: 180,
      follow: 90
    },
    ticketsSold: 16,
    ticketRevenue: 480,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-31'),
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200&h=300'
  }
];

// Components
function CampaignMetrics({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Budget</div>
            <div className="text-2xl font-bold">${campaign.budget}</div>
            <div className="text-sm text-muted-foreground">
              ${campaign.spent} spent
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Views</div>
            <div className="text-2xl font-bold">{campaign.views.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {((campaign.clicks / campaign.views) * 100).toFixed(1)}% CTR
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Tickets</div>
            <div className="text-2xl font-bold">{campaign.ticketsSold}</div>
            <div className="text-sm text-muted-foreground">
              ${campaign.ticketRevenue} revenue
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">ROI</div>
            <div className="text-2xl font-bold text-green-600">
              {((campaign.ticketRevenue - campaign.spent) / campaign.spent * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              +${campaign.ticketRevenue - campaign.spent}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Interested</div>
            <div className="text-xl font-bold">{campaign.engagement.interested}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Shared</div>
            <div className="text-xl font-bold">{campaign.engagement.shared}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Calendar</div>
            <div className="text-xl font-bold">{campaign.engagement.calendar}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Follows</div>
            <div className="text-xl font-bold">{campaign.engagement.follow}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CampaignCard({ campaign, onClick }: { campaign: Campaign; onClick: () => void }) {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer hover:bg-gray-50 transition-colors",
        campaign.status === 'paused' && "bg-gray-50"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">
              {campaign.type === 'featured' ? 'Featured Event' : 'Banner Ad'} Campaign
            </h4>
            <Badge variant="outline" className={cn(
              "text-xs",
              campaign.status === 'active' && "bg-green-50 text-green-700 border-green-200",
              campaign.status === 'paused' && "bg-amber-50 text-amber-700 border-amber-200"
            )}>
              {campaign.status === 'active' ? 'Active' : 'Paused'}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {format(campaign.startDate!, 'MMM d')} - {format(campaign.endDate!, 'MMM d')}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-muted-foreground">
              ${campaign.spent} spent of ${campaign.budget}
            </div>
            <div className="text-muted-foreground">
              {campaign.views.toLocaleString()} views
            </div>
            <div className="text-green-600">
              {campaign.ticketsSold} tickets sold
            </div>
          </div>
        </div>
        <Button variant="ghost" className="gap-2">
          View Report
        </Button>
      </div>
    </Card>
  );
}

export function AdvertisePage() {
  const [campaignType, setCampaignType] = useState<'featured' | 'banner'>('featured');
  const [budget, setBudget] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>(activeCampaigns);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [bannerImage, setBannerImage] = useState<string>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => {
        if (campaign.id === campaignId) {
          const newStatus = campaign.status === 'active' ? 'paused' : 'active';
          return { ...campaign, status: newStatus };
        }
        return campaign;
      })
    );
    
    if (selectedCampaign?.id === campaignId) {
      setSelectedCampaign(prev => 
        prev ? { ...prev, status: prev.status === 'active' ? 'paused' : 'active' } : null
      );
    }
  };

  const calculateEstimatedViews = (budget: string): { min: number; max: number } => {
    const amount = parseFloat(budget);
    if (!amount || amount < 20) return { min: 0, max: 0 };
    
    // Calculate range using $30 CPM and $19 CPM
    const minViews = Math.floor((amount * 1000) / 30); // $30 CPM
    const maxViews = Math.floor((amount * 1000) / 19); // $19 CPM
    
    return { min: minViews, max: maxViews };
  };

  const estimatedViews = calculateEstimatedViews(budget);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const isFormValid = (): boolean => {
    return Boolean(
      budget &&
      parseFloat(budget) >= 20 &&
      startDate &&
      endDate &&
      (campaignType === 'featured' || bannerImage)
    );
  };

  return (
    <div className="space-y-8">

      {selectedCampaign ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => setSelectedCampaign(null)}
              >
                <X className="h-4 w-4" />
                Close
              </Button>
              <h3 className="text-lg font-semibold">
                {selectedCampaign.type === 'featured' ? 'Featured Event' : 'Banner Ad'} Campaign
              </h3>
              <Badge variant="outline" className={cn(
                "text-xs",
                selectedCampaign.status === 'active' && "bg-green-50 text-green-700 border-green-200",
                selectedCampaign.status === 'paused' && "bg-amber-50 text-amber-700 border-amber-200"
              )}>
                {selectedCampaign.status === 'active' ? 'Active' : 'Paused'}
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => toggleCampaignStatus(selectedCampaign.id)}
              className={cn(
                selectedCampaign.status === 'active' && "text-amber-600 hover:text-amber-700",
                selectedCampaign.status === 'paused' && "text-green-600 hover:text-green-700"
              )}
            >
              {selectedCampaign.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
            </div>
          </div>

          <CampaignMetrics campaign={selectedCampaign} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6">
            <Card className={cn(
              "p-6 cursor-pointer transition-all duration-200",
              campaignType === 'featured' && "ring-2 ring-[#FF0000]"
            )} onClick={() => setCampaignType('featured')}>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Feature</h3>
                <p className="text-sm text-muted-foreground">
                  Feature your event across our platform
                </p>
              </div>
            </Card>

            <Card className={cn(
              "p-6 cursor-pointer transition-all duration-200",
              campaignType === 'banner' && "ring-2 ring-[#FF0000]"
            )} onClick={() => setCampaignType('banner')}>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Banner Ad</h3>
                <p className="text-sm text-muted-foreground">
                  Display your event banner in high-visibility areas of our platform
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Campaign Budget *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="20"
                    className="pl-7"
                    placeholder="Enter amount"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                {budget && parseFloat(budget) >= 20 && (
                  <p className="text-sm text-muted-foreground mt-2">Est. {estimatedViews.min.toLocaleString()} - {estimatedViews.max.toLocaleString()} views
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Campaign Duration *</Label>
                <div className="flex items-center gap-4">
                  <div className="grid flex-1 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          {startDate ? format(startDate, 'PPP') : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) =>
                            date < new Date() || (endDate ? date > endDate : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid flex-1 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          {endDate ? format(endDate, 'PPP') : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) =>
                            date < new Date() || (startDate ? date < startDate : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {campaignType === 'banner' && (
                <div className="space-y-2">
                  <Label>Banner Image *</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/png,image/jpeg"
                      onChange={handleImageUpload}
                    />
                    {bannerImage ? (
                      <div className="relative aspect-[4/1] rounded-lg overflow-hidden">
                        <img
                          src={bannerImage}
                          alt="Banner preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white font-medium">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                          <ImageIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p>1200x240px (max 5MB)</p>
                          <p className="text-xs mt-1">Supported formats: JPG, PNG</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-8">
              <Button
                className="bg-[#FF0000] hover:bg-red-600"
                disabled={!isFormValid()}
              >
                Create Campaign
              </Button>
            </div>
          </Card>

          {activeCampaigns.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Campaigns</h3>
              <div className="grid gap-4">
                {campaigns.map(campaign => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onClick={() => setSelectedCampaign(campaign)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
