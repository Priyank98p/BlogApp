import React, { useEffect, useState } from 'react'
import service from "../appwrite/Config"
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import readerSvg from '../assets/reader.svg'

const ReadingIllustration = () => (
  <img className="w-full max-w-sm mx-auto mr-8" src={readerSvg} alt="Reading Illustration" />
)

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </div>
)

const WelcomePage = ({ userName }) => (
  <div className="w-full min-h-screen bg-white flex items-center justify-center">
    <Container>
      <div className="flex flex-col items-center text-center py-24 px-4">
        <div className="text-6xl mb-6">👋</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {/* Only show name once it's available */}
          Welcome{userName ? `, ${userName}` : ''}!
        </h1>
        <p className="text-gray-400 text-base max-w-md leading-relaxed mb-8">
          You're all set. There are no posts yet, Be the first to share something with the community.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            to="/add-post"
            className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
          >
            Write your first post
          </Link>
        </div>
      </div>
    </Container>
  </div>
)

const GuestPage = () => (
  <div className="w-full min-h-screen bg-white">
    <Container>
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 py-20 px-4">
        <div className="flex-1 max-w-lg">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Welcome to BlogSpot
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Ideas worth <br />
            <span className="text-gray-400">reading.</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            Discover thoughtful essays, tutorials, and stories from writers who care about their craft.
            Join the community to start reading and sharing.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/signup"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
            >
              Get started, it's free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:border-gray-400 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <ReadingIllustration />
        </div>
      </div>
      <div className="border-t border-gray-100 mx-4" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-16 px-4">
        <FeatureCard icon="✍️" title="Write & Publish" desc="Share your ideas with a clean editor built for writers, not developers." />
        <FeatureCard icon="📖" title="Discover Stories" desc="Browse posts across design, technology, culture, and everyday life." />
        <FeatureCard icon="🔖" title="Save & Revisit" desc="Bookmark your favourites and come back to them whenever you like." />
      </div>
    </Container>
  </div>
)

// Minimal full-screen loader shown while auth is being resolved on refresh
const PageLoader = () => (
  <div className="w-full min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      <p className="text-xs text-gray-300 tracking-widest uppercase">Loading...</p>
    </div>
  </div>
)

function Home() {
  const [posts, setPosts] = useState([])

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  // authLoading should be set to true initially and false once App.jsx
  // finishes the getCurrentUser() check. Add this field to your auth slice.
  const authLoading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    if (authStatus) {
      service.getPosts().then((posts) => {
        if (posts) setPosts(posts.documents)
      })
    }
  }, [authStatus])

  // ── Still resolving session on refresh ───────────────────────────────────
  if (authLoading) return <PageLoader />

  // ── Not logged in ────────────────────────────────────────────────────────
  if (!authStatus) return <GuestPage />

  // ── Logged in, no posts ──────────────────────────────────────────────────
  if (posts.length === 0) return <WelcomePage userName={userData?.name} />

  // ── Logged in with posts ─────────────────────────────────────────────────
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home