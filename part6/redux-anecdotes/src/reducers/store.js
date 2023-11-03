import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./filterReducer.js";
import anecdoteReducer from "./anecdoteReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

export default store