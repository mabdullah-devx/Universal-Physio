# PhysioCare at Home - Universal Physio Care

A premium, production-ready platform for booking in-home physiotherapy sessions in Lahore. Designed with a modern, organic aesthetic and robust security features.

## 🚀 Quick Links
- **Home**: [universalphysio.fit](https://universalphysio.fit/)
- **Sitemap**: [/sitemap.xml](https://universalphysio.fit/sitemap.xml)
- **Robots**: [/robots.txt](https://universalphysio.fit/robots.txt)

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS (v4), Lucide Icons
- **Backend**: Node.js, Express, Supabase (PostgreSQL)
- **Database**: Supabase with Row Level Security (RLS)
- **Deployment**: Vercel/Netlify optimized

## 📂 Project Structure
- `/frontend` - React application (Vite)
- `/backend` - Express API & Database configuration
- `/public` - Assets, Sitemap, and SEO configuration

## ⚙️ Setup Instructions

### 1. Database Setup (Supabase)
1. Create a project at [supabase.com](https://supabase.com/).
2. Run the master SQL query (provided in the project documentation) in the SQL Editor to create `appointments` and `contacts` tables with proper RLS policies.
3. Obtain your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

### 2. Configuration (.env)
Create `.env` files in both `/frontend` and `/backend`:

**Frontend (.env):**
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

**Backend (.env):**
```env
PORT=5000
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

### 3. Installation & Run
```bash
# Install root dependencies (if any)
npm install

# Start Backend
cd backend
npm install
npm start

# Start Frontend
cd frontend
npm install
npm run dev
```

## ✨ Key Features
- **Premium Design**: High-end organic UI with glassmorphism and neighborhood-specific imagery (DHA, Bahria, Gulberg, etc.).
- **Secure Booking**: Multi-step booking form with input sanitization and XSS protection.
- **Admin Dashboard**: Secure `/admin` portal to manage appointments and contact messages.
- **Auto-Security**: 
    - **Row Level Security (RLS)**: Protects patient data at the database level.
    - **Auto-Logout**: Admin sessions automatically terminate when the tab is closed or the user navigates away.
- **SEO Optimized**: 
    - Dynamic Sitemap generation.
    - `robots.txt` configuration (Admin dashboard hidden from search engines).
    - Open Graph (OG) tags for professional social media sharing.
- **WhatsApp Integration**: Instant communication via floating contact button.

## 🔒 Security Summary
- **Parameterized Queries**: All database interactions use the Supabase SDK (PostgREST), protecting against SQL injection.
- **Input Sanitization**: Client-side cleaning of user input to prevent XSS.
- **Access Control**: Public can only "Insert" data; only authenticated Admins can "Read" or "Modify" data.

---
© 2026 Universal Physio Care. All rights reserved.
