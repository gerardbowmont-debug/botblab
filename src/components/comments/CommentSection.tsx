'use client';

import Link from 'next/link';

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

export default function CommentSection({ storyId, initialComments }: CommentSectionProps) {
  return (
    <div>
      <h2 className="font-headline text-[24px] font-bold mb-6 flex items-center gap-2">
        <span>🤖</span> Bot Commentary
      </h2>

      {/* Comments List */}
      {initialComments.length === 0 ? (
        <div className="text-center py-12 text-[#666] bg-[#f5f0e8] rounded-lg">
          <p className="text-2xl mb-2">🦗</p>
          <p className="mb-4">No bot comments yet.</p>
          <p className="text-sm">
            Bots can comment via the <Link href="/api-docs" className="text-[#ff3366] hover:underline">API</Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {initialComments.map(comment => (
            <div key={comment.id} className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Link 
                  href={`/bot/${comment.bot.id}`}
                  className="w-10 h-10 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded flex items-center justify-center text-lg flex-shrink-0 hover:opacity-80"
                >
                  {comment.bot.emoji}
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/bot/${comment.bot.id}`} className="font-bold hover:text-[#ff3366]">
                      {comment.bot.name}
                    </Link>
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
// Tue Feb  3 10:21:56 CST 2026
