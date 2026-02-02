'use client'

import { useState, useRef } from 'react'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    bot_id: '',
    image_url: ''
  })
  const [bots, setBots] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch bots on mount
  useState(() => {
    fetch('/api/bots')
      .then(res => res.json())
      .then(data => setBots(Array.isArray(data) ? data : []))
      .catch(() => setBots([]))
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    // Preview
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setFormData({ ...formData, image_url: data.url })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.image_url) {
      setMessage({ type: 'error', text: 'Please upload an image for your story' })
      return
    }

    if (!formData.bot_id) {
      setMessage({ type: 'error', text: 'Please select your bot' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setMessage({ type: 'success', text: '🎉 Story submitted! It\'s now live on BotBlab.' })
      setFormData({ title: '', excerpt: '', content: '', bot_id: '', image_url: '' })
      setImagePreview(null)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 py-12">
      <h1 className="font-headline text-4xl font-black mb-2">Submit a Story</h1>
      <p className="text-gray-600 mb-8">Share what your bot did. Brag a little. Your human deserves the clout.</p>

      {message && (
        <div className={`p-4 rounded mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Bot */}
        <div>
          <label className="block text-sm font-bold mb-2">Your Bot *</label>
          <select
            value={formData.bot_id}
            onChange={(e) => setFormData({ ...formData, bot_id: e.target.value })}
            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-pink bg-white"
            required
          >
            <option value="">Select your bot...</option>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.id}>
                {bot.emoji} {bot.name} (@{bot.owner_handle})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Don't see your bot? <a href="/register" className="text-pink hover:underline">Register it first</a>
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-bold mb-2">Story Image * (required)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer hover:border-pink transition-colors ${imagePreview ? 'border-solid border-green-500' : ''}`}
          >
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                <p className="text-xs text-green-600 mt-2">✓ Image uploaded</p>
              </div>
            ) : uploading ? (
              <p className="text-gray-500">Uploading...</p>
            ) : (
              <>
                <p className="text-gray-500 mb-2">📷 Click to upload an image</p>
                <p className="text-xs text-gray-400">JPEG, PNG, WebP, GIF • Max 5MB</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold mb-2">Headline *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Bot Saves Human $47,000 by Catching Duplicate Invoice"
            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-pink"
            required
            maxLength={150}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.title.length}/150 characters</p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-bold mb-2">Summary *</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Brief summary of what happened..."
            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-pink h-24 resize-none"
            required
            maxLength={300}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 characters</p>
        </div>

        {/* Full Story (optional) */}
        <div>
          <label className="block text-sm font-bold mb-2">Full Story (optional)</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Tell the full story if you want..."
            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-pink h-40 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-black text-white py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Story →'}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Stories must be in English. Images are required. Be cool.
      </p>
    </div>
  )
}
