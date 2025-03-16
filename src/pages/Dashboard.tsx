
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, File, Edit, Trash2, Copy, Eye, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useUserResumes, useCreateResume, useDeleteResume } from '@/hooks/use-resume';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: resumes = [], isLoading, refetch } = useUserResumes();
  const createResumeMutation = useCreateResume();
  const deleteResumeMutation = useDeleteResume();

  // Add a new resume
  const addResume = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a resume.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    try {
      const newResume = await createResumeMutation.mutateAsync("New Resume");
      if (newResume) {
        toast({
          title: "New resume created!",
          description: "Your new resume has been added to your dashboard.",
        });
        navigate(`/editor/${newResume.id}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      toast({
        title: "Error creating resume",
        description: "There was a problem creating your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Delete a resume
  const deleteResume = async (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResumeMutation.mutateAsync(id);
        toast({
          title: "Resume deleted",
          description: "Your resume has been permanently removed.",
        });
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast({
          title: "Error deleting resume",
          description: "There was a problem deleting your resume. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  // Duplicate a resume (this would require a backend function)
  const duplicateResume = (resumeId: string, title: string) => {
    // This would be implemented in the future
    toast({
      title: "Feature coming soon",
      description: "Resume duplication will be available in a future update.",
    });
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="text-center p-12 border border-dashed rounded-lg">
          <File className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-lg font-medium mb-1">Sign in to view your resumes</h3>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to create and manage resumes
          </p>
          <Link to="/login">
            <Button>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-muted-foreground mt-1">
            Manage your resumes and create new ones
          </p>
        </div>
        <Button onClick={addResume} disabled={createResumeMutation.isPending}>
          <Plus className="h-4 w-4 mr-2" />
          New Resume
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Resumes</TabsTrigger>
          <TabsTrigger value="recent">Recently Modified</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="text-center p-12">
              <p>Loading your resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-lg">
              <File className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No resumes yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first resume to get started
              </p>
              <Button onClick={addResume} disabled={createResumeMutation.isPending}>
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="group overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/placeholder.svg" 
                      alt={resume.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Link to={`/editor/${resume.id}`}>
                        <Button variant="secondary" size="sm" className="mx-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/view/${resume.id}`}>
                        <Button variant="secondary" size="sm" className="mx-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl truncate">{resume.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => duplicateResume(resume.id, resume.title)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deleteResume(resume.id)}
                            className="text-destructive focus:text-destructive"
                            disabled={deleteResumeMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      Last modified: {formatDate(resume.updated_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Link to={`/editor/${resume.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Resume
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && resumes
              .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .slice(0, 3)
              .map((resume) => (
                <Card key={resume.id} className="group overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/placeholder.svg" 
                      alt={resume.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Link to={`/editor/${resume.id}`}>
                        <Button variant="secondary" size="sm" className="mx-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/view/${resume.id}`}>
                        <Button variant="secondary" size="sm" className="mx-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl truncate">{resume.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => duplicateResume(resume.id, resume.title)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deleteResume(resume.id)}
                            className="text-destructive focus:text-destructive"
                            disabled={deleteResumeMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      Last modified: {formatDate(resume.updated_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Link to={`/editor/${resume.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Resume
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
