import { useState } from 'react';
import { AnalyticsLayout } from '@/layouts/AnalyticsLayout';
import { SalesSection } from '@/components/analytics/SalesSection';
import { TrafficSection } from '@/components/analytics/TrafficSection';
import { PeopleSection } from '@/components/analytics/PeopleSection';

export function AnalyticsPage() {
  const [activeSection, setActiveSection] = useState('Sales');

  return (
    <AnalyticsLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        
        {activeSection === 'Sales' && <SalesSection />}
        {activeSection === 'Traffic' && <TrafficSection />}
        {activeSection === 'People' && <PeopleSection />}
      </div>
    </AnalyticsLayout>
  );
}