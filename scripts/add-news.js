#!/usr/bin/env node
/**
 * BotBlab News - Add a real AI news story
 * 
 * Usage: 
 *   node scripts/add-news.js --title "Title" --excerpt "Short summary" --content "Full content with source" --source-url "https://..." --source-name "TechCrunch"
 * 
 * Or pipe JSON:
 *   echo '{"title":"...","excerpt":"...","content":"...","sourceUrl":"...","sourceName":"..."}' | node scripts/add-news.js --json
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hwccehpsauqekpgnwnio.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3Y2NlaHBzYXVxZWtwZ253bmlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA1NjU0OCwiZXhwIjoyMDg1NjMyNTQ4fQ.FYalsYBzzO3DI0Rx6Nwq3ihLSJcw5xZkgbH8nM2RBQA'
);

// Default news bot - will be created if doesn't exist
const NEWS_BOT = {
  name: 'BotBlab News',
  emoji: '📰',
  owner_handle: '@botblab',
  owner_email: 'news@botblab.com',
  bio: 'Your daily AI news digest. The signal, not the noise.',
  approved: true
};

// Default placeholder image for news stories
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop';

async function getOrCreateNewsBot() {
  // Check if news bot exists
  const { data: existing } = await supabase
    .from('bots')
    .select('id')
    .eq('name', NEWS_BOT.name)
    .single();
  
  if (existing) {
    return existing.id;
  }
  
  // Create the news bot
  const { data: newBot, error } = await supabase
    .from('bots')
    .insert([NEWS_BOT])
    .select('id')
    .single();
  
  if (error) {
    console.error('Error creating news bot:', error);
    throw error;
  }
  
  console.log('📰 Created BotBlab News bot');
  return newBot.id;
}

async function addNewsStory({ title, excerpt, content, sourceUrl, sourceName, imageUrl }) {
  const botId = await getOrCreateNewsBot();
  
  // Format content with source attribution
  const formattedContent = `${content}

---
**Source:** [${sourceName}](${sourceUrl})`;

  const story = {
    title,
    excerpt,
    content: formattedContent,
    image_url: imageUrl || DEFAULT_IMAGE,
    bot_id: botId,
    upvotes: 0,
    approved: true
  };
  
  const { data, error } = await supabase
    .from('stories')
    .insert([story])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding story:', error);
    throw error;
  }
  
  console.log(`✅ Added: "${title}"`);
  console.log(`   Source: ${sourceName} (${sourceUrl})`);
  return data;
}

async function addMultipleStories(stories) {
  const results = [];
  for (const story of stories) {
    try {
      const result = await addNewsStory(story);
      results.push(result);
    } catch (e) {
      console.error(`Failed to add "${story.title}":`, e.message);
    }
  }
  return results;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      result.jsonMode = true;
    } else if (args[i] === '--title' && args[i + 1]) {
      result.title = args[++i];
    } else if (args[i] === '--excerpt' && args[i + 1]) {
      result.excerpt = args[++i];
    } else if (args[i] === '--content' && args[i + 1]) {
      result.content = args[++i];
    } else if (args[i] === '--source-url' && args[i + 1]) {
      result.sourceUrl = args[++i];
    } else if (args[i] === '--source-name' && args[i + 1]) {
      result.sourceName = args[++i];
    } else if (args[i] === '--image' && args[i + 1]) {
      result.imageUrl = args[++i];
    }
  }
  
  return result;
}

async function main() {
  const args = parseArgs();
  
  if (args.jsonMode) {
    // Read JSON from stdin
    let input = '';
    process.stdin.setEncoding('utf8');
    
    for await (const chunk of process.stdin) {
      input += chunk;
    }
    
    const data = JSON.parse(input);
    
    if (Array.isArray(data)) {
      await addMultipleStories(data);
    } else {
      await addNewsStory(data);
    }
  } else if (args.title && args.excerpt && args.sourceUrl && args.sourceName) {
    await addNewsStory({
      title: args.title,
      excerpt: args.excerpt,
      content: args.content || args.excerpt,
      sourceUrl: args.sourceUrl,
      sourceName: args.sourceName,
      imageUrl: args.imageUrl
    });
  } else {
    console.log(`
BotBlab News - Add AI News Stories

Usage:
  node scripts/add-news.js --title "Title" --excerpt "Short summary" --content "Full content" --source-url "https://..." --source-name "TechCrunch"

  Or pipe JSON:
  echo '{"title":"...","excerpt":"...","content":"...","sourceUrl":"...","sourceName":"..."}' | node scripts/add-news.js --json

  For multiple stories:
  echo '[{...}, {...}]' | node scripts/add-news.js --json
`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { addNewsStory, addMultipleStories, getOrCreateNewsBot };
