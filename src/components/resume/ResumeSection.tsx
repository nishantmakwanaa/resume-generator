
import React, { useRef } from 'react';
import { 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Copy, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type SectionType = 
  | 'header' 
  | 'education' 
  | 'experience' 
  | 'skills' 
  | 'projects' 
  | 'achievements';

interface ResumeSectionProps {
  id: string;
  type: SectionType;
  title: string;
  children: React.ReactNode;
  isDragging: boolean;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
  onDelete: () => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  id,
  type,
  title,
  children,
  isDragging,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${title} section?`)) {
      onDelete();
    }
  };
  
  return (
    <div
      ref={sectionRef}
      draggable
      onDragStart={() => onDragStart(id)}
      onDragOver={(e) => onDragOver(e, id)}
      onDragEnd={onDragEnd}
      className={`draggable-section ${isDragging ? 'dragging' : ''} mb-6 bg-white rounded-lg border border-border overflow-hidden`}
    >
      <div className="py-3 px-4 bg-secondary flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-3 flex-1">
          <div 
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-secondary-foreground/10 rounded-sm transition-colors"
            onMouseDown={(e) => {
              // Prevent default to ensure onDragStart fires
              e.preventDefault();
              if (sectionRef.current) {
                sectionRef.current.draggable = true;
              }
            }}
            onMouseUp={() => {
              if (sectionRef.current) {
                sectionRef.current.draggable = false;
              }
            }}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={isFirst}
            className="h-8 w-8"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={isLast}
            className="h-8 w-8"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onDuplicate && (
                <DropdownMenuItem onClick={onDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default ResumeSection;
