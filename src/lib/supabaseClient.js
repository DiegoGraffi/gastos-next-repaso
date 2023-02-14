import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zegxxomqaaikwpiffxgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplZ3h4b21xYWFpa3dwaWZmeGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzMjg0MzYsImV4cCI6MTk5MTkwNDQzNn0.2OZy4cyl-RQMuvdkfBgScVOQeAAObKEpc1eP_p56sto"
);
