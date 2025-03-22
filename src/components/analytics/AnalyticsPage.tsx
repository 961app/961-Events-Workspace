import { useState } from 'react';
import { AnalyticsSidebar } from './AnalyticsSidebar';
import { SalesOverview } from './SalesOverview';
import { TrafficView } from './TrafficView';
import { PeopleView } from './PeopleView';

interface AnalyticsPageProps {
  onViewAttendees: () => void;
}

export function AnalyticsPage({ onViewAttendees }: AnalyticsPageProps) {
  const [activeSection, setActiveSection] = useState('sales');
  const [activeSubsection, setActiveSubsection] = useState('overview');
  
  const handleNavigate = (section: string, subsection: string = 'overview') => {
    setActiveSection(section);
    setActiveSubsection(subsection);
  };
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AnalyticsSidebar
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        onNavigate={handleNavigate}
      />
      
      <div className="flex-1 pl-[calc(192px+2rem)] pr-8 py-8 max-w-[calc(1100px+192px)] mx-auto">
        {activeSection === 'sales' && <SalesOverview />}
        {activeSection === 'traffic' && <TrafficView />}
        {activeSection === 'people' && <PeopleView onViewAttendees={onViewAttendees} />}
      </div>
    </div>
  );
}