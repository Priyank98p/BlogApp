import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    // HOOK: Gives us the power to send (dispatch) actions to the Redux store
    const dispatch = useDispatch()
    
    // HANDLER: The function that runs when the user clicks the button
    const logoutHandler = () => {
        // 1. Backend: Tell Appwrite to destroy the current session on the server
        authService.logout().then(() => {
            // 2. Frontend: Only AFTER the server succeeds, tell Redux to wipe the user data
            dispatch(logout())
        })
    }

  return (
    <div>
      <button 
        className='inline-bock text-white bg-red-600 px-6 py-2 duration-200 hover:bg-red-400 rounded-full cursor-pointer mx-1 px-3 py-1.5 text-xs        
                     sm:text-sm                      
                     md:mx-2 md:px-6 md:py-2 md:text-base' 
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  )
}

export default LogoutBtn