import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // Importing the reducer we defined in authSlice.js

const store = configureStore({
    reducer: {
        // We tell the store: "I have a slice of state called 'auth', 
        // and it should be managed by the 'authSlice' reducer."
        auth: authSlice, 
        // If you had more slices (e.g., posts), you would add them here:
        // posts: postsSlice,
    }
});

export default store;