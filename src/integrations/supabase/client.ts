// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tzxykojjetdpdlfnecrj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eHlrb2pqZXRkcGRsZm5lY3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTQ2MDMsImV4cCI6MjA1NzY5MDYwM30.nTY8PREgRGPfNmqBylnqzWHv0r48QXfgqqAciGRtNHM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);