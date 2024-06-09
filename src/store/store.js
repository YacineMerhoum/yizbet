import { configureStore } from "@reduxjs/toolkit";
import footballReducer from "../slices/footballSlice"

export const store = configureStore({
    reducer: {
        football: footballReducer,
    }
})