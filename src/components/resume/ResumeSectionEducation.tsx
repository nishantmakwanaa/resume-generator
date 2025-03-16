
import React, { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeSectionEducationProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const ResumeSectionEducation: React.FC<ResumeSectionEducationProps> = ({
  items,
  onChange,
}) => {
  // Add a new empty education item
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange([...items, newItem]);
  };

  // Update a specific education item
  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedItems);
  };

  // Remove an education item
  const removeEducation = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="relative p-4 border border-border rounded-lg">
          {items.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 text-destructive"
              onClick={() => removeEducation(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${item.id}`}>Institution</Label>
              <Input
                id={`institution-${item.id}`}
                value={item.institution}
                onChange={(e) => updateEducation(item.id, 'institution', e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${item.id}`}>Location</Label>
              <Input
                id={`location-${item.id}`}
                value={item.location}
                onChange={(e) => updateEducation(item.id, 'location', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor={`degree-${item.id}`}>Degree</Label>
            <Input
              id={`degree-${item.id}`}
              value={item.degree}
              onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
              placeholder="Bachelor of Science in Computer Science"
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
                onChange={(e) => updateEducation(item.id, 'startDate', e.target.value)}
                placeholder="Sep 2018"
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
                onChange={(e) => updateEducation(item.id, 'endDate', e.target.value)}
                placeholder="May 2022 (or Present)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`description-${item.id}`}>Description</Label>
            <Textarea
              id={`description-${item.id}`}
              value={item.description}
              onChange={(e) => updateEducation(item.id, 'description', e.target.value)}
              placeholder="Relevant coursework, achievements, GPA, etc."
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addEducation}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};

export default ResumeSectionEducation;
