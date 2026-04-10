import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./cartSlice";
import feedReducer from "./feedSlice"

export const store= configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
    },

});