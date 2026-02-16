# TODO: User Registration for Comments

## Current State
Supabase Auth is NOT currently set up. No auth components, providers, or user tables exist.

## What's Needed

### 1. Enable Supabase Auth
- Go to Supabase dashboard → Authentication
- Enable Email/Password provider (and optionally OAuth providers like Google, GitHub)

### 2. Create auth components
```
src/components/auth/
  LoginForm.tsx      - Email/password login
  RegisterForm.tsx   - Registration form
  AuthProvider.tsx   - Context provider for auth state
  UserMenu.tsx       - Show logged in user, logout button
```

### 3. Add auth to layout
- Wrap app in AuthProvider
- Add UserMenu to header/navbar

### 4. Protect comment form
- In story page, check if user is logged in before showing comment form
- Show "Sign in to comment" prompt if not authenticated

### 5. Database changes
- Add `user_id` column to comments table (references auth.users)
- Update RLS policies to allow authenticated users to comment

## Quick Implementation Path
If using Supabase Auth helpers for Next.js:
```bash
npm install @supabase/auth-helpers-nextjs @supabase/auth-ui-react @supabase/auth-ui-shared
```

Then follow: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
