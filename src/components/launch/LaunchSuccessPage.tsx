import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PartyPopper, ArrowRight, Copy, Check } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

interface LaunchSuccessPageProps {
  eventTitle?: string;
  eventSlug?: string;
}

export function LaunchSuccessPage({ 
  eventTitle = "Your event", 
  eventSlug = "trois-pirate-debarquent-sur-seine" 
}: LaunchSuccessPageProps) {
  const [copied, setCopied] = useState(false);
  const eventUrl = `events.961.co/france/paris/${eventSlug}`;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <PartyPopper className="h-8 w-8 text-[#FF0000]" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Congratulations!</h1>
          <h2 className="text-xl font-medium text-[#FF0000]">{eventTitle}</h2>
          <p className="text-lg text-muted-foreground">
            has been published and is now live
          </p>
        </div>

        <Card className="mt-8 p-6 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-red-900">Partner with 961 and get more reach!</h3>
              <p className="text-sm text-red-700">
                Boost your event visibility and ticket sales by becoming a 961 partner.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white hover:bg-white text-[#FF0000] border-red-200 hover:border-red-300"
            >
              Get more details
            </Button>
          </div>
        </Card>

        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 text-left px-4 py-2 rounded-lg text-sm font-medium truncate">
              {eventUrl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go to dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}