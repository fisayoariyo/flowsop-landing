import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqfgugwebejzasooservd.supabase.co";
const supabaseKey = "sb_publishable_mIUbG9eB2Ed4r5EwLtAq0w_zrGdOVBP";

export const supabase = createClient(supabaseUrl, supabaseKey);
