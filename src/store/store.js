import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // Importing the reducer we defined in authSlice.js

const store = configureStore({
    reducer: {
       
        auth: authSlice, 
    
    }
});

export default store;