import { Ticket, LineChart, Megaphone, Users } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { EventsPage } from '@/components/EventsPage';
import { AnalyticsPage } from '@/components/analytics/AnalyticsPage';
import { LaunchSuccessPage } from '@/components/launch/LaunchSuccessPage';
import { MarketingPage } from '@/components/marketing/MarketingPage';
import { BalancePage } from '@/components/BalancePage';
import { MediaPartnerPage } from '@/components/media/MediaPartnerPage';
import { AttendeesList } from '@/components/analytics/AttendeesList';
import { TeamPage } from '@/components/team/TeamPage';
import { NavItem } from '@/types';
import { useState, useCallback } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('events');
  const [showAttendees, setShowAttendees] = useState(false);
  const [analyticsSection, setAnalyticsSection] = useState('Sales');
  const [teamSection, setTeamSection] = useState('overview');
  const [totalBalance, setTotalBalance] = useState(0);

  const handleBalanceUpdate = useCallback((balance: number) => {
    setTotalBalance(balance);
  }, []);

  const navItems: NavItem[] = [
    { 
      icon: Ticket, 
      label: 'Events', 
      active: currentPage === 'events', 
      href: '/events',
      onClick: () => setCurrentPage('events')
    },
    { 
      icon: Megaphone, 
      label: 'Marketing', 
      href: '/marketing',
      onClick: () => setCurrentPage('marketing')
    },
    { 
      icon: LineChart, 
      label: 'Analytics', 
      active: currentPage === 'analytics',
      href: '/analytics',
      onClick: () => setCurrentPage('analytics')
    },
    { 
      icon: Users, 
      label: 'Team', 
      active: currentPage === 'team',
      href: '/team',
      onClick: () => setCurrentPage('team')
    }
  ];

  return (
    <MainLayout 
      navItems={navItems}
      totalBalance={totalBalance}
      onBalanceClick={() => setCurrentPage('balance')}
    >
      {currentPage === 'events' && <EventsPage />}
      {currentPage === 'launch-success' && <LaunchSuccessPage />}
      {currentPage === 'balance' && <BalancePage onBalanceUpdate={handleBalanceUpdate} />}
      {currentPage === 'marketing' && <MarketingPage />}
      {currentPage === 'analytics' && (
        <>
          {!showAttendees && <AnalyticsPage onViewAttendees={() => setShowAttendees(true)} />}
          {showAttendees && (
            <AttendeesList 
              onBack={() => setShowAttendees(false)}
              activeSection={analyticsSection}
              onNavigate={(section) => {
                setAnalyticsSection(section);
                setShowAttendees(false);
              }}
            />
          )}
        </>
      )}
      {currentPage === 'team' && <TeamPage />}
      {currentPage === 'media-partner' && <MediaPartnerPage />}
    </MainLayout>
  );
}

export default App;