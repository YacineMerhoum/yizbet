import { configureStore } from "@reduxjs/toolkit";
import footballReducer from "../slices/footballSlice"
import matchReducer from "../slices/matchSlice";
import matchDayReducer from "../slices/sectionSlice"


export const store = configureStore({
    reducer: {
        football: footballReducer,
        match: matchReducer,
        matchDay: matchDayReducer,
       
    }
})