
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  createResume, 
  getUserResumes, 
  getResumeById, 
  saveResumeSection, 
  updateResumeSection, 
  deleteResumeSection,
  updateResumeSectionsOrder,
  deleteResume,
  ResumeSection,
  Resume
} from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export function useUserResumes() {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      try {
        const { data, error } = await getUserResumes();
        if (error) throw error;
        return data || [];
      } catch (error) {
        toast({
          title: "Failed to load resumes",
          description: "Could not fetch your resumes. Please try again.",
          variant: "destructive"
        });
        return [];
      }
    }
  });
}

export function useResumeById(id: string) {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      try {
        if (!id) return null;
        return await getResumeById(id);
      } catch (error) {
        toast({
          title: "Failed to load resume",
          description: "Could not fetch resume details. Please try again.",
          variant: "destructive"
        });
        console.error("Resume fetch error:", error);
        return null;
      }
    },
    enabled: !!id
  });
}

export function useCreateResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await createResume(title);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: "Resume created",
        description: "Your new resume has been created successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create resume",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}

export function useSaveResumeSection() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (section: Omit<ResumeSection, 'id'>) => {
      const { data, error } = await saveResumeSection(section);
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['resume', variables.resume_id] });
    },
    onError: (error) => {
      toast({
        title: "Failed to save section",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}

export function useUpdateResumeSection() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<ResumeSection> }) => {
      const { data, error } = await updateResumeSection(id, updates);
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['resume', data.resume_id] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update section",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}

export function useDeleteResumeSection() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, resumeId }: { id: string, resumeId: string }) => {
      const { error } = await deleteResumeSection(id);
      if (error) throw error;
      return { id, resumeId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['resume', data.resumeId] });
      toast({
        title: "Section deleted",
        description: "Resume section has been deleted."
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete section",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}

export function useUpdateSectionsOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ sections, resumeId }: { sections: { id: string, order: number }[], resumeId: string }) => {
      await updateResumeSectionsOrder(sections);
      return { sections, resumeId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['resume', data.resumeId] });
    },
    onError: (error) => {
      toast({
        title: "Failed to reorder sections",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await deleteResume(id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete resume",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  });
}
