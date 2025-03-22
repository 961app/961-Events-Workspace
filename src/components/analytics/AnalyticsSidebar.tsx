import { BarChart3, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AnalyticsSection {
  id: string;
  label: string;
  icon: typeof BarChart3
}

interface AnalyticsSidebarProps {
  activeSection: string;
  activeSubsection: string;
  onNavigate: (section: string, subsection: string) => void;
}

const sections: AnalyticsSection[] = [
  {
    id: 'sales',
    label: 'Sales',
    icon: BarChart3
  },
  { id: 'traffic', label: 'Traffic', icon: TrendingUp },
  { id: 'people', label: 'People', icon: Users }
];

export function AnalyticsSidebar({ activeSection, activeSubsection, onNavigate }: AnalyticsSidebarProps) {
  return (
    <aside className="w-48 min-h-[calc(100vh-4rem)] border-r border-gray-200 pt-8 px-4 fixed top-16 left-0 bg-white">
      {sections.map((section) => (
        <div key={section.id} className="mb-1">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-between h-11 text-sm font-bold group',
              activeSection === section.id && 'bg-red-50 text-[#FF0000] hover:bg-red-100 hover:text-[#FF0000]',
              'focus:ring-0 focus-visible:ring-0 focus:outline-none'
            )}
            onClick={() => onNavigate(section.id)}
          >
            <span className="tracking-wide">{section.label}</span>
            <section.icon className={cn(
              "h-4 w-4 transition-colors",
              activeSection === section.id ? "text-[#FF0000]" : "text-muted-foreground"
            )} />
          </Button>
        </div>
      ))}
    </aside>
  );
}