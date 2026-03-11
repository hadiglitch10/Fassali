# Fassali - AI Wardrobe Assistant

## Project Overview
Fassali (فصّلي) is an AI-powered wardrobe assistant web app that helps users
build a digital wardrobe and get personalized outfit recommendations.
Target market: Arabic-speaking users (Egypt, Saudi Arabia, Morocco).

## Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend/DB: Firebase (Auth + Firestore + Storage)
- AI: Google Gemini API (gemini-1.5-flash - free tier)
- Background Removal: remove.bg API (free tier - 50/month)
- Hosting: Vercel (free)

## Core Features (MVP)

### 1. Authentication
- Google Sign In only (keep it simple)
- Firebase Auth

### 2. Wardrobe Upload
- User uploads photo of clothing item
- Auto background removal via remove.bg
- Gemini AI analyzes and tags the item:
  - Category (shirt, pants, shoes, etc.)
  - Color
  - Style (casual, formal, sports)
  - Season
- Item saved to Firestore + image to Firebase Storage

### 3. Digital Wardrobe View
- Grid view of all clothing items
- Filter by category, color, season
- Delete items

### 4. AI Outfit Generator
- User selects occasion (casual, work, date, wedding, sport)
- Gemini picks best matching items from wardrobe
- Shows outfit as a combination of items
- Gives styling tip in Arabic

### 5. What's Missing
- AI analyzes wardrobe gaps
- Suggests what to buy to complete the wardrobe

## UI/UX Guidelines
- Mobile-first design
- Dark mode by default
- Arabic + English support (Arabic primary)
- Clean, minimal, premium feel
- Colors: Black, White, Gold accent (#C9A84C)

## Project Structure
src/
  app/          → Next.js app router pages
  components/   → Reusable UI components
  lib/          → Firebase, Gemini, utilities
  hooks/        → Custom React hooks
  types/        → TypeScript types

## Environment Variables needed
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
GEMINI_API_KEY
REMOVE_BG_API_KEY

## Important Notes
- All AI prompts to Gemini should be in Arabic
- Keep bundle size small
- Optimize images before upload
- Free tier limits: remove.bg (50/month), Gemini (free), Firebase (free)
