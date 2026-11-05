/* Supabase connection for saving test results.
   The publishable key is safe to expose in the browser: row level security
   only lets visitors INSERT results, never read them. */
window.SUPABASE_URL = "https://wibyvazibstivdfevnax.supabase.co";
window.SUPABASE_KEY = "sb_publishable_hF-kq0ZCXvDMVdVFmkspsg_XOkc8j5W";
window.PASS_MARK = 75; // must score MORE than this percentage
