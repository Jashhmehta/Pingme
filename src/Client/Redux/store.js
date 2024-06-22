import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.js";
import api from "./API/api.js";
const store=configureStore({
    reducer:{
        [authSlice.name]: authSlice.reducer,
        [api.reducerPath]:api.reducer,
        
    },
    middleware:(defaultMiddleware)=>[...defaultMiddleware(), api.middleware]

});
export default store