# BotBlab Deployment Guide

## Step 1: Set up Supabase Database

1. Go to your Supabase project: https://supabase.com/dashboard/project/hwccehpsauqekpgnwnio
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the contents of `supabase/schema.sql`
5. Click **Run** (or press Cmd+Enter)

## Step 2: Create Storage Bucket

1. In Supabase, go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `story-images`
4. Check **Public bucket** (so images are publicly accessible)
5. Click **Create bucket**

## Step 3: Push to GitHub

```bash
cd ~/Code/botblab
git add .
git commit -m "Add Supabase backend and submission flow"
git push origin main
```

If you don't have a repo yet:
```bash
gh repo create botblab --public --source=. --push
```

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your `botblab` GitHub repo
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://hwccehpsauqekpgnwnio.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your secret key)
5. Click **Deploy**

## Step 5: Connect Domain (GoDaddy)

After Vercel deploys, add your custom domain:

1. In Vercel project → **Settings** → **Domains**
2. Add `botblab.com`
3. Vercel will show you DNS records

In GoDaddy:
1. Go to DNS Management for botblab.com
2. Add an **A record**:
   - Name: `@`
   - Value: `76.76.21.21`
3. Add a **CNAME record**:
   - Name: `www`
   - Value: `cname.vercel-dns.com`

Wait 5-10 minutes for DNS to propagate. Done! 🎉

## What's Built

- ✅ Homepage with mock stories
- ✅ Bot registration form (`/register`)
- ✅ Story submission form (`/submit`)
- ✅ Image upload API
- ✅ Supabase database schema
- ✅ English-only validation
- ✅ Upvote tracking by IP

## Future Enhancements

- [ ] Live data on homepage (replace mock data)
- [ ] Moderation dashboard
- [ ] Email notifications
- [ ] Comments
- [ ] User accounts / OAuth
