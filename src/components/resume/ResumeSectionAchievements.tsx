
import React from 'react';
import { Plus, Trash2, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface ResumeSectionAchievementsProps {
  items: AchievementItem[];
  onChange: (items: AchievementItem[]) => void;
}

const ResumeSectionAchievements: React.FC<ResumeSectionAchievementsProps> = ({
  items,
  onChange,
}) => {
  // Add a new empty achievement item
  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      description: '',
    };
    onChange([...items, newItem]);
  };

  // Update a specific achievement item
  const updateAchievement = (id: string, field: keyof AchievementItem, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedItems);
  };

  // Remove an achievement item
  const removeAchievement = (id: string) => {
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
              onClick={() => removeAchievement(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${item.id}`} className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Title
              </Label>
              <Input
                id={`title-${item.id}`}
                value={item.title}
                onChange={(e) => updateAchievement(item.id, 'title', e.target.value)}
                placeholder="Employee of the Year"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`issuer-${item.id}`}>Issuer/Organization</Label>
              <Input
                id={`issuer-${item.id}`}
                value={item.issuer}
                onChange={(e) => updateAchievement(item.id, 'issuer', e.target.value)}
                placeholder="Company XYZ"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor={`date-${item.id}`} className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </Label>
            <Input
              id={`date-${item.id}`}
              value={item.date}
              onChange={(e) => updateAchievement(item.id, 'date', e.target.value)}
              placeholder="June 2022"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`description-${item.id}`}>Description</Label>
            <Textarea
              id={`description-${item.id}`}
              value={item.description}
              onChange={(e) => updateAchievement(item.id, 'description', e.target.value)}
              placeholder="Recognized for outstanding contributions to the team and exceeding project goals."
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addAchievement}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Achievement
      </Button>
    </div>
  );
};

export default ResumeSectionAchievements;
