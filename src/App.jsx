import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
import { Footerr } from "./components"
import { Headerr } from "./components"
import './App.css'

function App() {
  // STATE: Keeps track of whether we are currently fetching the user data.
  // We start it as 'true' so the app waits before rendering the components.
  const [loading, setLoading] = useState(true)

  // HOOK: Gives us the ability to send actions (like login/logout) to the Redux store.
  const dispatch = useDispatch()

  // EFFECT: Runs exactly once when the app first loads.
  useEffect(() => {
    // 1. Ask Appwrite: "Is there a session active right now?"
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // 2a. If yes, send that user data to the Redux store
          dispatch(login({ userData }))
        } else {
          // 2b. If no, ensure the Redux store knows no one is logged in
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })
      // 3. Regardless of success or failure, turn off the loading state
      .finally(() => setLoading(false))
  }, []) // Empty dependency array means this only runs on mount

  // RENDER: Conditional rendering based on the 'loading' state.
  return !loading ? (
    // If NOT loading, show the actual app UI
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Headerr />
        {/* OUTLET: This is where React Router swaps out the page components (Home, Login, Post, etc.) */}
        <main className="min-h-screen flex flex-col justify-between">
          <Outlet />
        </main>
        <Footerr />
      </div>
    </div>
  ) : (
    // If IS loading, show nothing (you could replace 'null' with a <LoadingSpinner /> component here)
    null
  )
}

export default App