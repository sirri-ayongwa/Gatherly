// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nqpojqoqhvarfbozwwla.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcG9qcW9xaHZhcmZib3p3d2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTExOTksImV4cCI6MjA2MTQyNzE5OX0.aG002mjgjfwJ5d2teJMMWJBeudpou0_RQeyD8pL22q4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);