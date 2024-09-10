import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_AK || "";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
