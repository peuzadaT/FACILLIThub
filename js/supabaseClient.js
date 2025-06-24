// O import correto para uso no navegador, via CDN.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// A URL do seu projeto Supabase (está correta!)
const supabaseUrl = 'https://jrqtdlmelodxbzuyigpp.supabase.co';

// A CHAVE PÚBLICA (anon key) do seu projeto Supabase
// IMPORTANTE: Use a chave 'anon public', não a 'service_role secret'.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycXRkbG1lbG9keGJ6dXlpZ3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MjkyMjgsImV4cCI6MjA2NjMwNTIyOH0.FLADTQ4_HrIJ_bDiKiPCOEWb8WQqfD3SimN7VfEO5PM';

// Exporta o cliente Supabase para ser usado em outros arquivos
export const supabase = createClient(supabaseUrl, supabaseKey);