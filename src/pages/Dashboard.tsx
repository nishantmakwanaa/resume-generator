
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Share2, 
  Copy, 
  Trash2,
  ChevronDown,
  Pencil
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Mock data for resumes
const mockResumes = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    lastEdited: new Date(2023, 4, 15),
    thumbnail: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Product Manager Resume',
    lastEdited: new Date(2023, 5, 22),
    thumbnail: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Marketing Resume',
    lastEdited: new Date(2023, 6, 8),
    thumbnail: '/placeholder.svg',
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumes, setResumes] = useState(mockResumes);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resumes based on search query
  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateResume = () => {
    navigate('/editor/new');
  };
  
  const handleEditResume = (id: string) => {
    navigate(`/editor/${id}`);
  };
  
  const handleDuplicateResume = (id: string) => {
    const resumeToDuplicate = resumes.find(r => r.id === id);
    if (!resumeToDuplicate) return;
    
    const newResume = {
      ...resumeToDuplicate,
      id: (Math.max(...resumes.map(r => parseInt(r.id))) + 1).toString(),
      name: `${resumeToDuplicate.name} (Copy)`,
      lastEdited: new Date(),
    };
    
    setResumes([...resumes, newResume]);
    
    toast({
      title: "Resume Duplicated",
      description: `"${resumeToDuplicate.name}" has been duplicated.`,
    });
  };
  
  const handleDeleteResume = (id: string) => {
    const resumeToDelete = resumes.find(r => r.id === id);
    if (!resumeToDelete) return;
    
    setResumes(resumes.filter(r => r.id !== id));
    
    toast({
      title: "Resume Deleted",
      description: `"${resumeToDelete.name}" has been deleted.`,
    });
  };
  
  const handleDownloadResume = (id: string) => {
    // Mock download functionality
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as PDF.",
    });
  };
  
  const handleShareResume = (id: string) => {
    // Mock share functionality
    const shareLink = `https://resumecraft.example.com/view/${id}`;
    
    // In a real app, this would copy to clipboard
    console.log("Share link:", shareLink);
    
    toast({
      title: "Share Link Created",
      description: "Resume share link copied to clipboard.",
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn userName="John Doe" />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold animate-fade-in">My Resumes</h1>
              <p className="text-muted-foreground mt-1 animate-fade-in">Manage and create professional resumes</p>
            </div>
            
            <Button onClick={handleCreateResume} className="animate-fade-in">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resumes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Date: Newest First
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Date: Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Name: A to Z
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Name: Z to A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {filteredResumes.length === 0 ? (
            <div className="text-center py-12 glass rounded-lg animate-fade-in">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No resumes found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {searchQuery ? "Try a different search term" : "Create your first resume to get started"}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateResume}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Resume
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((resume, index) => (
                <div 
                  key={resume.id} 
                  className="glass group rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div 
                    className="aspect-[8.5/11] bg-white cursor-pointer relative overflow-hidden"
                    onClick={() => handleEditResume(resume.id)}
                  >
                    {/* Resume thumbnail */}
                    <div className="h-full w-full p-6 flex flex-col">
                      <div className="h-[15%] border-b border-gray-200 flex flex-col justify-center">
                        <div className="h-4 w-1/2 bg-gray-300 rounded-full"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded-full mt-2"></div>
                      </div>
                      <div className="flex flex-1 gap-4 mt-4">
                        <div className="w-1/3">
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-6"></div>
                          
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-2/3">
                          <div className="h-4 w-1/3 bg-gray-300 rounded-full mb-3"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-6"></div>
                          
                          <div className="h-4 w-1/3 bg-gray-300 rounded-full mb-3"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay with edit button */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" className="z-10">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Resume
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="overflow-hidden">
                      <h3 className="font-medium text-foreground truncate">{resume.name}</h3>
                      <p className="text-xs text-muted-foreground">Last edited: {formatDate(resume.lastEdited)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditResume(resume.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadResume(resume.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareResume(resume.id)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateResume(resume.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteResume(resume.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
