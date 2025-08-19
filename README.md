
---

## 🔧 Prerequisites

- **Node.js** v18+ and **npm** v9+
- **Appwrite** project (Cloud or self‑hosted)

---

## ⚙️ Environment Variables

Copy `.env.sample` to `.env` and fill in your Appwrite details.

| Key | Description |
| --- | --- |
| `VITE_APPWRITE_URL` | Appwrite endpoint (e.g. `https://cloud.appwrite.io/v1`) |
| `VITE_APPWRITE_PROJECT_ID` | Your Appwrite Project ID |
| `VITE_APPWRITE_DATABASE_ID` | Database ID that stores posts |
| `VITE_APPWRITE_COLLECTION_ID` | Collection ID for posts |
| `VITE_APPWRITE_BUCKET_ID` | Storage Bucket ID for images |

> 👀 These are consumed in `src/conf/conf.js` and then used across `src/appWrite/auth.js` and `src/appWrite/config.js`.

---

## 🗄️ Appwrite Setup (Recommended)

1. **Create Project** → get **Project ID**.
2. **Auth** → enable Email/Password provider.
3. **Database**
   - Create a **Database** → note **Database ID**.
   - Create a **Collection** (e.g. `posts`) → note **Collection ID**.
   - **Attributes** (suggested):
     - `title` (string, required)
     - `content` (string, required)
     - `featuredImage` (string, required) – stores file ID from Storage
     - `status` (enum: `active`, `inactive`; default `active`)
     - `userId` (string, required) – author’s account ID
   - **Indexes** (optional but helpful):
     - `status_idx` on `status`
     - `user_idx` on `userId`
4. **Permissions** (example)
   - **Create**: any authenticated user
   - **Read**: anyone (or only when `status = active` as your UI filters by this)
   - **Update/Delete**: document owner (author) only
5. **Storage**
   - Create a **Bucket** → note **Bucket ID**.
   - Allow authenticated users to **Create, Read, Delete** their files.

---

## 🚀 Getting Started

```bash
# 1) Clone
git clone https://github.com/your-username/mega-blog-website.git
cd mega-blog-website

# 2) Install deps
npm install

# 3) Configure environment
cp .env.sample .env
# then open .env and fill in your Appwrite IDs

# 4) Run dev server
npm run dev
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Lint the project 
```

## 🧭 Usage Flow (Recommended)
