

import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

// Resume related types
export type SectionType = 'header' | 'education' | 'experience' | 'skills' | 'projects' | 'achievements';

export interface ResumeSection {
  id: string;
  resume_id: string;
  type: SectionType;
  title: string;
  content: any;
  order: number;
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// Auth helper functions
export async function signIn(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
  
  return { data, error };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

// Resume database operations
export async function createResume(title: string) {
  const user = await supabase.auth.getUser();
  
  if (!user.data.user) {
    throw new Error('User is not authenticated');
  }
  
  const { data, error } = await supabase
    .from('resumes')
    .insert([
      { 
        title, 
        user_id: user.data.user.id 
      }
    ])
    .select()
    .single();
    
  return { data, error };
}

export async function getUserResumes() {
  const user = await supabase.auth.getUser();
  
  if (!user.data.user) {
    throw new Error('User is not authenticated');
  }
  
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('updated_at', { ascending: false });
    
  return { data, error };
}

export async function getResumeById(id: string) {
  const { data: resume, error: resumeError } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();
    
  if (resumeError) {
    throw resumeError;
  }
  
  const { data: sections, error: sectionsError } = await supabase
    .from('resume_sections')
    .select('*')
    .eq('resume_id', id)
    .order('order', { ascending: true });
    
  if (sectionsError) {
    throw sectionsError;
  }
  
  return { resume, sections };
}

export async function saveResumeSection(section: Omit<ResumeSection, 'id'>) {
  const { data, error } = await supabase
    .from('resume_sections')
    .insert([section])
    .select()
    .single();
    
  return { data, error };
}

export async function updateResumeSection(id: string, updates: Partial<ResumeSection>) {
  const { data, error } = await supabase
    .from('resume_sections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
}

export async function deleteResumeSection(id: string) {
  return await supabase
    .from('resume_sections')
    .delete()
    .eq('id', id);
}

export async function updateResumeSectionsOrder(sections: { id: string, order: number }[]) {
  // Use Promise.all to update all sections in parallel
  const updates = sections.map(section => 
    supabase
      .from('resume_sections')
      .update({ order: section.order })
      .eq('id', section.id)
  );
  
  return await Promise.all(updates);
}

export async function deleteResume(id: string) {
  // First delete all sections
  await supabase
    .from('resume_sections')
    .delete()
    .eq('resume_id', id);
    
  // Then delete the resume
  return await supabase
    .from('resumes')
    .delete()
    .eq('id', id);
}
