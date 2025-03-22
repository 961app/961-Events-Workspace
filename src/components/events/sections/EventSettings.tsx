import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from 'lucide-react';

interface EventSettingsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  tags: string[];
  newTag: string;
  onNewTagChange: (tag: string) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
  ageRestriction: string | number;
  onAgeRestrictionChange: (value: string | number) => void;
}

export function EventSettings({
  categories,
  selectedCategory,
  onCategoryChange,
  tags,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  visibility,
  onVisibilityChange,
  ageRestriction, 
  onAgeRestrictionChange
}: EventSettingsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Event Settings</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Visibility</Label>
          <div className="flex gap-2">
            <Button
              variant={visibility === 'public' ? 'default' : 'outline'}
              onClick={() => onVisibilityChange('public')}
            >
              Public
            </Button>
            <Button
              variant={visibility === 'private' ? 'default' : 'outline'}
              onClick={() => onVisibilityChange('private')}
            >
              Private
            </Button>
          </div>
          {visibility === 'private' && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-muted-foreground">
              Only people with the private link can access this event
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Age Restriction *</Label>
          <div className="flex items-center gap-4">
            <Button
              variant={ageRestriction === 'all' ? 'default' : 'outline'}
              onClick={() => onAgeRestrictionChange('all')}
              className="flex-1 h-10"
            >
              All Ages
            </Button>
            <span className="text-sm text-muted-foreground font-medium">or</span>
            <div className="flex-1 flex gap-2 items-center h-10">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Minimum age"
                value={ageRestriction === 'all' ? '' : ageRestriction}
                onChange={(e) => onAgeRestrictionChange(e.target.value ? parseInt(e.target.value) : '')}
                onClick={() => {
                  if (ageRestriction === 'all') {
                    onAgeRestrictionChange('');
                  }
                }}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">years old</span>
            </div>
          </div>
          {ageRestriction !== 'all' && ageRestriction !== '' && (
            <p className="mt-2 text-sm text-muted-foreground">
              App will restrict users from buying or receiving a ticket if they don't meet the age requirement by the event day.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Category *</Label>
          <p> Note to devs: Use the categories list from the events.961.co git.</p>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select event category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="space-y-3">
            <Input
              placeholder="Add tags (press Enter)"
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyDown={onAddTag}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => onRemoveTag(tag)}
                  >
                    {tag}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}