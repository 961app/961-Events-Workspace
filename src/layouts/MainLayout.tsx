import { Header } from '@/components/Header';
import type { BaseLayoutProps } from '@/types';

interface MainLayoutProps extends BaseLayoutProps {
  onBalanceClick?: () => void;
  totalBalance: number;
}

export function MainLayout({ children, navItems, onBalanceClick, totalBalance }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          navItems={navItems} 
          onBalanceClick={onBalanceClick}
          totalBalance={totalBalance}
        />
      </div>
      <main className="flex-1 max-w-[1088px] mx-auto px-8 py-8 mt-16">
        {children}
      </main>
    </div>
  );
}