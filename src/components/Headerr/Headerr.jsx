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
    <header className='py-3'>
      <Container>
        {/* Changed to flex-col for mobile stacking, md:flex-row for desktop */}
        <nav className='flex flex-col md:flex-row items-center w-full'>
          
          {/* LOGO SECTION */}
          {/* Added mb-4 to create space between logo and links on mobile */}
          <div className='mb-4 md:mb-0 md:mr-4'>
            {/* We use <Link> here so clicking the logo acts as a home button */}
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* NAVIGATION LINKS SECTION */}
          {/* Removed ml-auto on mobile to center links, added md:ml-auto for desktop */}
          <ul className='flex flex-wrap justify-center md:justify-end md:ml-auto items-center'>
            {/* Loop through our navItems array */}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='text-white inline-block bg-black duration-200 hover:bg-gray-700 rounded-full cursor-pointer 
                     mx-1 px-3 py-1.5 text-xs        
                     sm:text-sm                      
                     md:mx-2 md:px-6 md:py-2 md:text-base'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* LOGOUT BUTTON SECTION */}
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