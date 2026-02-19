import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // HOOK: Reads the 'status' (true/false) from the 'auth' slice of the Redux store.
  // Whenever the user logs in or out, this component will instantly re-render.
  const authStatus = useSelector((state) => state.auth.status)
  
  // HOOK: Gives us a function to programmatically change pages (routes).
  const navigate = useNavigate()

  // DATA STRUCTURE: An array of objects defining all possible navigation links.
  // WHY: This makes the UI highly scalable. Instead of writing lots of repetitive JSX 
  // with complex if/else statements, we just configure the rules here.
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true // Always visible
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Visible ONLY if authStatus is false
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // Visible ONLY if authStatus is false
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, // Visible ONLY if authStatus is true
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, // Visible ONLY if authStatus is true
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          {/* LOGO SECTION */}
          <div className='mr-4'>
            {/* We use <Link> here so clicking the logo acts as a home button */}
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* NAVIGATION LINKS SECTION */}
          <ul className='flex ml-auto'>
            {/* Loop through our navItems array */}
            {navItems.map((item) => 
              // CONDITIONAL RENDER: Only render the button if item.active is true
              item.active ? (
                // React requires a unique 'key' when mapping over arrays
                <li key={item.name}>
                  <button
                    // When clicked, use the 'navigate' function to go to the item's slug (URL)
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null // If item.active is false, render absolutely nothing
            )}

            {/* LOGOUT BUTTON SECTION */}
            {/* If authStatus is true, evaluate and render the code inside the parentheses */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header