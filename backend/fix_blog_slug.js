const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function fixSlug() {
  const cleanSlug = 'foam-rolling-are-you-actually-fixing-your-muscles-or-just-fooling-your-brain';
  const { data, error } = await supabaseAdmin
    .from('blogs')
    .update({ slug: cleanSlug })
    .eq('id', '6b3c0ef6-597c-46f5-b293-f405b37ec279')
    .select();

  console.log('Update Error:', error);
  console.log('Updated Blog:', data);
}

fixSlug();
