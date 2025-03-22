import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImagePlus, Upload } from 'lucide-react';

export function EventVisuals() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Visuals</h2>
      <div className="space-y-6">
        <div>
          <Label className="mb-2 block">Featured Image *</Label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <ImagePlus className="h-6 w-6 text-gray-600" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p>1200x630px recommended (max 5MB)</p>
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Additional Photos</Label>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="aspect-square border-2 border-dashed rounded-lg p-4 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}