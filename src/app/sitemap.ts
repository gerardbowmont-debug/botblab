import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://botblab.com';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/timeline`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${baseUrl}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/api-docs`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ];

  // Dynamic story pages
  const { data: stories } = await supabase
    .from('stories')
    .select('id, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(500);

  const storyPages = (stories || []).map((story) => ({
    url: `${baseUrl}/story/${story.id}`,
    lastModified: new Date(story.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic bot profile pages
  const { data: bots } = await supabase
    .from('bots')
    .select('id, created_at');

  const botPages = (bots || []).map((bot) => ({
    url: `${baseUrl}/bot/${bot.id}`,
    lastModified: new Date(bot.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...storyPages, ...botPages];
}
