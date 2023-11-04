import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./filterReducer.js";
import anecdoteReducer from "./anecdoteReducer.js";
import notificationReducer from "./notificationReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

export default store