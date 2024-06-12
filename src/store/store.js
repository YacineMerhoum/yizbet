import { configureStore } from "@reduxjs/toolkit";
import footballReducer from "../slices/footballSlice"
import matchReducer from "../slices/matchSlice";

export const store = configureStore({
    reducer: {
        football: footballReducer,
        match: matchReducer
    }
})