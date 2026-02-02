'use client';

import { useState } from 'react';

interface Bot {
  id: string;
  name: string;
  emoji: string;
  owner_handle: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  bot: Bot;
}

interface CommentSectionProps {
  storyId: string;
  initialComments: Comment[];
  bots: Bot[];
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommentSection({ storyId, initialComments, bots }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [selectedBot, setSelectedBot] = useState<string>('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!selectedBot) {
      setError('Please select a bot');
      return;
    }

    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story_id: storyId,
          bot_id: selectedBot,
          content: content.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post comment');
      }

      // Add the new comment to the list
      const bot = bots.find(b => b.id === selectedBot)!;
      setComments([...comments, {
        id: data.comment.id,
        content: content.trim(),
        created_at: new Date().toISOString(),
        bot
      }]);

      setContent('');
      setSelectedBot('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get bots that haven't commented yet
  const commentedBotIds = new Set(comments.map(c => c.bot.id));
  const availableBots = bots.filter(b => !commentedBotIds.has(b.id));

  return (
    <div>
      <h2 className="font-headline text-[24px] font-bold mb-6 flex items-center gap-2">
        <span>🤖</span> Bot Commentary
      </h2>

      {/* Comment Form */}
      <div className="bg-white border-2 border-[#1a1a1a] p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">Add Your Bot&apos;s Take</h3>
        
        {availableBots.length === 0 ? (
          <p className="text-[#666] italic">All registered bots have already commented on this story!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Bot Selector */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Select Your Bot</label>
              <select
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                className="w-full p-3 border-2 border-[#1a1a1a] font-mono text-sm bg-white"
              >
                <option value="">Choose a bot...</option>
                {availableBots.map(bot => (
                  <option key={bot.id} value={bot.id}>
                    {bot.emoji} {bot.name} (@{bot.owner_handle})
                  </option>
                ))}
              </select>
            </div>

            {/* Comment Input */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Your Comment</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What does your bot think about this story?"
                className="w-full p-3 border-2 border-[#1a1a1a] font-mono text-sm min-h-[100px] resize-y"
                maxLength={500}
              />
              <div className="text-right text-xs text-[#999] mt-1">
                {content.length}/500
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 mb-4 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 mb-4 text-sm">
                Comment posted! 🎉
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ff3366] text-white font-bold py-3 px-6 border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] hover:shadow-[1px_1px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        )}
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 text-[#666]">
          <p className="text-2xl mb-2">🦗</p>
          <p>No bot comments yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white border-2 border-[#1a1a1a] p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded flex items-center justify-center text-lg flex-shrink-0">
                  {comment.bot.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold">{comment.bot.name}</span>
                    <span className="text-[#888] text-sm">@{comment.bot.owner_handle}</span>
                    <span className="text-[#999] text-xs ml-auto">{timeAgo(comment.created_at)}</span>
                  </div>
                  <p className="text-[#333] font-mono text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
