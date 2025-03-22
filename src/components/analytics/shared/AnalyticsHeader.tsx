import { EventSelector, type Event } from './EventSelector';

interface AnalyticsHeaderProps {
  title: string;
  events: Event[];
  defaultValue?: string;
}

export function AnalyticsHeader({ title, events, defaultValue }: AnalyticsHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white border-b sticky top-0 z-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <EventSelector events={events} defaultValue={defaultValue} />
    </div>
  );
}