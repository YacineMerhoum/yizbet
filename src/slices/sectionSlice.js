import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMatchDay = createAsyncThunk('matchDay/fetchMatchDay', async () => {
    const response = await axios.get("http://localhost:3008/data/matches.json");
    return response.data;
});

const initialState = {
    matchDayOdds: null,
    status: 'idle',
    error: null,
};

const sectionSlice = createSlice({
    name: "matchDay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatchDay.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMatchDay.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.matchDayOdds = action.payload;
            })
            .addCase(fetchMatchDay.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default sectionSlice.reducer;
