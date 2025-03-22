import { Button } from '@/components/ui/button'; 
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, Globe, Megaphone, Users, Loader2, X, Download } from 'lucide-react';
import { useState } from 'react';

interface Benefit {
  icon: typeof Globe;
  title: string;
  description: string;
}

interface Requirement {
  text: string;
  info?: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Globe,
    title: 'Additional Platform Visibility',
    description: 'More exposure on 961\'s events platform and app, reaching thousands of engaged users daily'
  },
  {
    icon: Megaphone,
    title: 'Extensive Media Coverage',
    description: 'Exposure on Lebanon\'s leading digital media outlet reaching millions of people'
  },
  {
    icon: Users,
    title: 'Targeted Audience Reach',
    description: 'Connect with our engaged community of event-goers'
  }
];

const REQUIREMENTS: Requirement[] = [
  { text: 'Event must align with 961\'s mission and values' },
  {
    text: 'Digital media exclusivity',
    info: 'We require full exclusivity on digital media. No other outlets, social pages, or event platforms. Excludes TV, radio, or OOH media.'
  },
  { text: '961 and 961 Events logos on event promotional material' }
];

const LOGOS = [1, 2, 3].map((i) => ({
  id: i,
  placeholder: '🖼️',
  label: `Logo ${i}`
}));

export function MediaPartnerPage() {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      setTimeout(() => {
        setHasApplied(false);
        setIsRejected(true);
      }, 2000);
    }, 1000);
  };

  const getButtonContent = () => {
    if (isApplying) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Applying...
        </>
      );
    }
    
    if (isRejected) {
      return (
        <>
          <X className="h-4 w-4" />
          Media partner request not accepted
        </>
      );
    }
    
    return hasApplied ? (
      <><Check className="h-4 w-4" />Application Pending</>
    ) : (
      'Apply for Partnership'
    );
  };

  const PageLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-5xl mx-auto space-y-8 pb-16"> 
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => showSuccess ? setShowSuccess(false) : window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Media Partner</h1>
        </div>
      </div>
      {children}
    </div>
  );

  const SuccessView = () => (
    <div className="max-w-3xl">
      <Card className="p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-[#FF0000]" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Congratulations!</h1>
          <div className="space-y-2">
            {['961 is now your official media partner!', '961 Events is your official ticketing partner!'].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <p className="text-lg text-[#FF0000] font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {LOGOS.map(({ id, placeholder, label }) => (
            <Card key={id} className="p-4 aspect-video flex items-center justify-center bg-gray-50 border-dashed">
              <div className="text-center">
                <div className="text-4xl mb-2">{placeholder}</div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="pt-4 space-y-4">
          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            Download All Logos
          </Button>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>To activate the partnership, upload all the promo materials containing our logo and a document listing placements and distribution.</p>
            <p>Once approved, the campaigns will activate.</p>
            <p>Ensure our logos are sizeable and notably placed.</p>
          </div>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium">Drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">Upload your promotional materials</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const ApplicationView = () => (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-4">
        Partner with 961 for Unmatched Event Exposure
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Make 961 your digital media partner and get your event the visibility it deserves. 
        Featuring your event on our platform and app guarantees increased exposure across Lebanon's leading digital outlet.
      </p>

      <div className="space-y-6 mb-12">
        {BENEFITS.map((benefit, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <benefit.icon className="h-6 w-6 text-[#FF0000]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 mb-8">
        <h3 className="text-lg font-semibold mb-6">Partnership Requirements</h3>
        <div className="space-y-6 mb-8">
          {REQUIREMENTS.map((requirement, index) => (
            <div key={index} className="flex gap-3">
              <Check className="h-5 w-5 text-[#FF0000] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">{requirement.text}</span>
                {requirement.info && <p className="text-sm text-muted-foreground mt-1">{requirement.info}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p 
            className="text-sm text-muted-foreground text-center cursor-pointer hover:text-foreground"
            onClick={() => setShowSuccess(true)}
          >
            Dev: if accepted
          </p>
          <Button 
            size="lg"
            disabled={isApplying || hasApplied || isRejected}
            className="w-full bg-[#FF0000] hover:bg-red-600 gap-2"
            onClick={handleApply}
          > 
            {getButtonContent()}
          </Button>
          {isRejected && (
            <p className="text-sm text-center text-muted-foreground">
              Maybe it wasn't a fit - try again next event
            </p>
          )}
          {hasApplied && (
            <p className="text-sm text-center text-muted-foreground">
              Our team will review your application within 5 business days.
            </p>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <PageLayout>
      {showSuccess ? <SuccessView /> : <ApplicationView />}
    </PageLayout>
  );
}