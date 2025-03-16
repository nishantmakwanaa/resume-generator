
import React from 'react';
import { Plus, Trash2, Link as LinkIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  link: string;
  description: string;
}

interface ResumeSectionProjectsProps {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

const ResumeSectionProjects: React.FC<ResumeSectionProjectsProps> = ({
  items,
  onChange,
}) => {
  // Add a new empty project item
  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      link: '',
      description: '',
    };
    onChange([...items, newItem]);
  };

  // Update a specific project item
  const updateProject = (id: string, field: keyof ProjectItem, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedItems);
  };

  // Remove a project item
  const removeProject = (id: string) => {
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
              onClick={() => removeProject(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${item.id}`}>Project Name</Label>
              <Input
                id={`name-${item.id}`}
                value={item.name}
                onChange={(e) => updateProject(item.id, 'name', e.target.value)}
                placeholder="Portfolio Website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${item.id}`}>Your Role</Label>
              <Input
                id={`role-${item.id}`}
                value={item.role}
                onChange={(e) => updateProject(item.id, 'role', e.target.value)}
                placeholder="Lead Developer"
              />
            </div>
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
                onChange={(e) => updateProject(item.id, 'startDate', e.target.value)}
                placeholder="Mar 2022"
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
                onChange={(e) => updateProject(item.id, 'endDate', e.target.value)}
                placeholder="Jun 2022 (or Present)"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor={`link-${item.id}`} className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Project Link
            </Label>
            <Input
              id={`link-${item.id}`}
              type="url"
              value={item.link}
              onChange={(e) => updateProject(item.id, 'link', e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`description-${item.id}`}>Description</Label>
            <Textarea
              id={`description-${item.id}`}
              value={item.description}
              onChange={(e) => updateProject(item.id, 'description', e.target.value)}
              placeholder="• Developed a personal portfolio website using React and Tailwind CSS
• Implemented responsive design for optimal viewing on all devices
• Integrated with a CMS for easy content updates"
              rows={4}
            />
          </div>
        </div>
      ))}
      
      <Button
        variant="outline"
        onClick={addProject}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ResumeSectionProjects;
