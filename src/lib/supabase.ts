// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Inizializza il client Supabase una volta sola per tutta l'app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);