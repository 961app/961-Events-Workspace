import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { EventBasicInfo } from '@/components/events/sections/EventBasicInfo';
import { EventVisuals } from '@/components/events/sections/EventVisuals';
import { EventVenue } from '@/components/events/sections/EventVenue';
import { EventSettings } from '@/components/events/sections/EventSettings';

const categories = [
  'Music',
  'Arts & Culture',
  'Food & Drink',
  'Sports & Fitness',
  'Business & Professional',
  'Community & Causes',
  'Fashion & Beauty',
  'Film & Media',
  'Health & Wellness',
  'Hobbies & Special Interest',
  'Other'
];

interface CreateEventPageProps {
  onNext: () => void;
  onBack: () => void;
}

export function CreateEventPage({ onNext, onBack }: CreateEventPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [eventType, setEventType] = useState<'free' | 'paid'>('paid');
  const [ageRestriction, setAgeRestriction] = useState<string | number>('all');
  const [eventVisibility, setEventVisibility] = useState('public');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Create Event</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={onNext}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EventBasicInfo 
        eventType={eventType}
        onEventTypeChange={setEventType}
      />
      
      <EventVisuals />
      
      <EventVenue />

      <EventSettings
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        tags={tags}
        newTag={newTag}
        onNewTagChange={setNewTag}
        onAddTag={handleAddTag}
        onRemoveTag={removeTag}
        visibility={eventVisibility}
        onVisibilityChange={setEventVisibility}
        ageRestriction={ageRestriction}
        onAgeRestrictionChange={setAgeRestriction}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Please fill in all required fields (*)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button 
            className="gap-2 bg-[#FF0000] hover:bg-red-600"
            onClick={onNext}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}