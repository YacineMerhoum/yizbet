import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://api.football-data.org/v4/competitions/EC/matches";
const API_KEY = '1a93aed1ad8b40d1af324616d76267c1';

export const fetchMatches = createAsyncThunk(
  'football/fetchMatches',
  async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          'X-Auth-Token': API_KEY,
        }
      });
      const { competition, matches } = response.data;
      return { competition, matches };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const footballSlice = createSlice({
  name: 'football',
  initialState: {
    competition: {},
    matches: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.competition = action.payload.competition;
        // Limiter les matchs à 10
        state.matches = action.payload.matches.slice(0, 10);
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default footballSlice.reducer;
