# BlogSpot 📝

A full-stack blogging platform where users can sign up, write posts with rich text and images, and manage their own content. Built with React on the frontend and Appwrite as the backend , no custom server needed.

---

## What It Does

- Create an account and log in securely
- Write blog posts using a rich text editor (TinyMCE)
- Upload a featured image for each post
- Save posts as drafts or publish them live
- Edit or delete your own posts
- Browse all published posts from any user

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| State Management | Redux Toolkit |
| Forms | React Hook Form |
| Rich Text Editor | TinyMCE |
| Backend / Database | Appwrite |
| Auth | Appwrite Auth |
| File Storage | Appwrite Storage |

---

## Project Structure

```
src/
├── appwrite/
│   ├── auth.js          # Login, signup, logout, getCurrentUser
│   └── Config.js        # Posts CRUD and file upload/preview
├── assets/
│   └── reader.svg       # Illustration used on homepage
├── components/
│   ├── Container/       # Layout wrapper
│   ├── Footerr/         # Footer with newsletter + nav links
│   ├── Headerr/         # Top nav with auth-aware buttons
│   ├── PostForm/        # Form for creating and editing posts
│   ├── AuthLayout.jsx   # Protects routes based on login status
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Logo.jsx
│   ├── Login.jsx
│   ├── PostCard.jsx     # Card shown in post listings
│   ├── RTE.jsx          # TinyMCE rich text editor wrapper
│   ├── Select.jsx
│   └── SignUp.jsx
├── config/
│   └── config.js        # Reads all env variables in one place
├── Pages/
│   ├── Home.jsx         # Landing page or post feed
│   ├── AllPost.jsx      # All published posts
│   ├── AddPost.jsx      # Create new post
│   ├── EditPost.jsx     # Edit existing post
│   ├── Post.jsx         # Single post view
│   ├── Login.jsx
│   └── SignUp.jsx
├── store/
│   ├── authSlice.js     # Redux auth state (status, userData, loading)
│   └── store.js         # Redux store setup
├── App.jsx              # App entry, session check on load
└── main.jsx             # React DOM render + Router setup
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Priyank98p/BlogSpot
cd BlogSpot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Appwrite

You'll need a free [Appwrite](https://appwrite.io) account. Once you're in:

1. **Create a project** , copy the Project ID
2. **Create a database** , copy the Database ID
3. **Create a table** inside the database with these attributes:
   - `title` , String
   - `content` , String
   - `featuredImage` , String
   - `status` , String
   - `userId` , String
4. **Set table permissions** , add `Any: Read` and `Users: Read, Write`
5. **Create a storage bucket** , copy the Bucket ID
6. **Set bucket permissions** , add `Any: Read` so images load publicly

### 4. Create your `.env` file

```env
VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_PROJECT_ID=your_project_id
VITE_DATABASE_ID=your_database_id
VITE_TABLE_ID=your_collection_id
VITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_ID=your_tinymce_api_key
```

> ⚠️ No quotes around values. Just `KEY=value` on each line.

Get your TinyMCE API key for free at [tiny.cloud](https://www.tiny.cloud).

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're good to go.

---

## How It Works

**Authentication** is handled entirely through Appwrite. When a user signs up or logs in, a session is created on Appwrite's servers. The app then fetches the user data and stores it in Redux so any component can access it.

On every page refresh, `App.jsx` calls `getCurrentUser()` to check if a session already exists. If it does, the user stays logged in. If not, they're treated as a guest.

**Posts** are stored as documents in your Appwrite database collection. Featured images are uploaded to Appwrite Storage, and the returned file ID is saved with the post so it can be previewed later.

**Route protection** is done through `AuthLayout.jsx` , it checks the Redux auth state and redirects users away from pages they shouldn't access (like Add Post if not logged in).

---

## Common Issues

**Images not showing** - Check your Appwrite bucket permissions. Add `Any: Read` under the bucket settings.

**Posts not loading** - Check your table permissions. Add `Any: Read` and `Users: Read`.

**`buckets/undefined` error** - Your `VITE_BUCKET_ID` in `.env` is missing or has quotes around it. Remove the quotes and restart the dev server.

**Username disappears on refresh** - Make sure your `authSlice.js` has a `loading: true` initial state and your `App.jsx` dispatches `login` or `logout` after `getCurrentUser()` resolves.

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build locally
```

---

## License

MIT - feel free to use this as a starting point for your own projects.