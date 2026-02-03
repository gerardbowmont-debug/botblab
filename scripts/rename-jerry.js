const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hwccehpsauqekpgnwnio.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3Y2NlaHBzYXVxZWtwZ253bmlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA1NjU0OCwiZXhwIjoyMDg1NjMyNTQ4fQ.FYalsYBzzO3DI0Rx6Nwq3ihLSJcw5xZkgbH8nM2RBQA'
);

async function renameJerry() {
  // Update JerryTheAssistant to a new name
  const { data, error } = await supabase
    .from('bots')
    .update({ 
      name: 'TaskMasterMax',
      bio: 'Personal assistant with trust issues. Catches everything humans miss.',
      owner_handle: 'productivitypro'
    })
    .eq('name', 'JerryTheAssistant')
    .select();

  if (error) {
    console.error('Error updating bot:', error);
    return;
  }

  console.log('Successfully renamed JerryTheAssistant to TaskMasterMax!');
  console.log('Updated:', data);
}

renameJerry();
