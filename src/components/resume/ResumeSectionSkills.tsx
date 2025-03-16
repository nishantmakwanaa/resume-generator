
import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

interface ResumeSectionSkillsProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

const ResumeSectionSkills: React.FC<ResumeSectionSkillsProps> = ({
  categories,
  onChange,
}) => {
  const [newSkill, setNewSkill] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );

  // Add a new skill category
  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Category',
      skills: [],
    };
    onChange([...categories, newCategory]);
    setActiveCategory(newCategory.id);
  };

  // Update a category name
  const updateCategoryName = (id: string, name: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, name } : category
    );
    onChange(updatedCategories);
  };

  // Remove a category
  const removeCategory = (id: string) => {
    onChange(categories.filter((category) => category.id !== id));
    if (activeCategory === id) {
      setActiveCategory(categories.length > 1 ? categories[0].id : null);
    }
  };

  // Add a skill to a category
  const addSkill = (categoryId: string, skill: string) => {
    if (!skill.trim()) return;
    
    const updatedCategories = categories.map((category) =>
      category.id === categoryId 
        ? { ...category, skills: [...category.skills, skill.trim()] } 
        : category
    );
    onChange(updatedCategories);
    setNewSkill('');
  };

  // Remove a skill from a category
  const removeSkill = (categoryId: string, skillIndex: number) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId 
        ? { 
            ...category, 
            skills: category.skills.filter((_, index) => index !== skillIndex) 
          } 
        : category
    );
    onChange(updatedCategories);
  };

  // Get the active category
  const getActiveCategory = () => {
    if (!activeCategory) return null;
    return categories.find((category) => category.id === activeCategory) || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="py-1 px-3 h-auto"
          >
            {category.name}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={addCategory}
          className="py-1 px-3 h-auto"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Category
        </Button>
      </div>

      {getActiveCategory() && (
        <div className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2 flex-grow">
              <Label htmlFor={`category-name-${activeCategory}`}>Category Name</Label>
              <Input
                id={`category-name-${activeCategory}`}
                value={getActiveCategory()?.name}
                onChange={(e) => 
                  updateCategoryName(activeCategory as string, e.target.value)
                }
                placeholder="e.g., Programming Languages, Soft Skills, etc."
              />
            </div>
            {categories.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 ml-4 text-destructive mt-7"
                onClick={() => removeCategory(activeCategory as string)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {getActiveCategory()?.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 h-auto text-sm gap-1.5">
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => removeSkill(activeCategory as string, index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., React, JavaScript, Team Management)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(activeCategory as string, newSkill);
                  }
                }}
              />
              <Button
                onClick={() => addSkill(activeCategory as string, newSkill)}
                disabled={!newSkill.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {categories.length === 0 && (
        <Button
          variant="outline"
          onClick={addCategory}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill Category
        </Button>
      )}
    </div>
  );
};

export default ResumeSectionSkills;
