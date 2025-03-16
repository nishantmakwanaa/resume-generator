
import React from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeSectionExperienceProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

const ResumeSectionExperience: React.FC<ResumeSectionExperienceProps> = ({
  items,
  onChange,
}) => {
  // Add a new empty experience item
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange([...items, newItem]);
  };

  // Update a specific experience item
  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedItems);
  };

  // Remove an experience item
  const removeExperience = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="relative p-4 border border-border rounded-lg">
          {items.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-destructive"
              onClick={() => removeExperience(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${item.id}`}>Company</Label>
              <Input
                id={`company-${item.id}`}
                value={item.company}
                onChange={(e) => updateExperience(item.id, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${item.id}`}>Location</Label>
              <Input
                id={`location-${item.id}`}
                value={item.location}
                onChange={(e) => updateExperience(item.id, 'location', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor={`position-${item.id}`}>Position</Label>
            <Input
              id={`position-${item.id}`}
              value={item.position}
              onChange={(e) => updateExperience(item.id, 'position', e.target.value)}
              placeholder="Software Engineer"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${item.id}`} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </Label>
              <Input
                id={`startDate-${item.id}`}
                value={item.startDate}
                onChange={(e) => updateExperience(item.id, 'startDate', e.target.value)}
                placeholder="Jan 2020"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${item.id}`} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                End Date
              </Label>
              <Input
                id={`endDate-${item.id}`}
                value={item.endDate}
                onChange={(e) => updateExperience(item.id, 'endDate', e.target.value)}
                placeholder="Present"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`description-${item.id}`}>Description</Label>
            <Textarea
              id={`description-${item.id}`}
              value={item.description}
              onChange={(e) => updateExperience(item.id, 'description', e.target.value)}
              placeholder="• Developed and maintained front-end applications using React
• Implemented responsive designs and improved application performance by 40%
• Collaborated with cross-functional teams to deliver product features"
              rows={5}
            />
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addExperience}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};

export default ResumeSectionExperience;
