import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMatchDay = createAsyncThunk(
    'match/fetchMatchDay',
    async () => {
      try {
        const response = await axios.get('https://api.football-data.org/v4/matches/', {
          headers: {
            'X-Auth-Token': '1a93aed1ad8b40d1af324616d76267c1'
          }
        });
        return response.data;
      } catch (error) {
        throw new Error('Match non trouvé !');
      }
    }
  );

  const initialState = {
    matchDayOdds: null
  }

  const sectionSlice = createSlice({
    name: "matchDay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchMatchDay.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchMatchDay.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.matchDayOdds = action.payload;
          })
          .addCase(fetchMatchDay.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
  }})

  export default sectionSlice.reducer;