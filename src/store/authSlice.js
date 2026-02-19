import { createSlice } from "@reduxjs/toolkit";

// PURPOSE: Defines the default, starting state of our authentication before the user does anything.
const initialState = {
    status: false, // Default: User is NOT logged in
    userData: null // Default: No user data exists yet
};

// PURPOSE: Creates a "slice" of the global Redux store specifically for authentication.
const authSlice = createSlice({
    name: "auth", // The internal name Redux uses to identify this slice
    initialState, // Plugs in the default state defined above
    reducers: { 
    
        // ACTION: Triggered when the user successfully logs in
        login: (state, action) => {
            // Under the hood, Redux Toolkit uses a library called "Immer". 
            // It allows us to write code that *looks* like it's directly modifying (mutating) the state, 
            // but safely creates a new copy behind the scenes.
            state.status = true;
            state.userData = action.payload; // Saves the user info passed in from the component
        },

        // ACTION: Triggered when the user logs out
        logout: (state) => {
            state.status = false;
            state.userData = null; // Wipes the user data from the global state
        }
    }
});

// EXPORT ACTIONS: We export 'login' and 'logout' so our React components (like a Login form or Navbar) can trigger them.
export const { login, logout } = authSlice.actions;

// EXPORT REDUCER: We export the main reducer function to wire it up to our store (like you did in store.js).
export default authSlice.reducer;

//improvement- we are tracking only login and logout right now
// we have created authSlice but haven't created postSlice ,post should have been gone so this is the improvement i guess well we'll see if it's right