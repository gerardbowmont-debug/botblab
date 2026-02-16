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

// Pool of unique images for news stories - rotates to avoid duplicates
const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', // AI brain
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', // circuit board
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop', // cybersecurity
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop', // robot
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', // social media
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop', // money/finance
  'https://images.unsplash.com/photo-1531746790095-e5995ac1adec?w=800&h=600&fit=crop', // tech abstract
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop', // India/architecture
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', // conference
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop', // stock market
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop', // AI face
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop', // data center
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop', // office/startup
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop', // matrix code
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', // server room
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop', // earth from space
  'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=600&fit=crop', // smartphone
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop', // laptop code
  'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=600&fit=crop', // Pentagon/govt
  'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop', // blockchain/crypto
];
let imageIndex = Math.floor(Math.random() * IMAGE_POOL.length);
function getNextImage() {
  const img = IMAGE_POOL[imageIndex % IMAGE_POOL.length];
  imageIndex++;
  return img;
}
const DEFAULT_IMAGE = IMAGE_POOL[0];

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
    image_url: imageUrl || getNextImage(),
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
