// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oroslofdovklvdlwfjth.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yb3Nsb2Zkb3ZrbHZkbHdmanRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzUyMDEsImV4cCI6MjA2NDgxMTIwMX0.tDNWYQURpOAZtBsiNG3gPT6j4Cq5huC-gptD4tNR61Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);