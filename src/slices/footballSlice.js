import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://api.football-data.org/v4/competitions/EC/standings";
const API_KEY = '1a93aed1ad8b40d1af324616d76267c1';

export const fetchStandings = createAsyncThunk(
  'football/fetchStandings',
  async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          'X-Auth-Token': API_KEY,
        }
      });
      const { standings } = response.data;
      return standings;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const bestScored = createAsyncThunk(
  'match/bestScored',
  async () => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/competitions/EC/scorers', {
        headers: {
          'X-Auth-Token': '1a93aed1ad8b40d1af324616d76267c1'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Les buteurs ne sont pas disponibles !');
    }
  }
);

const footballSlice = createSlice({
  name: 'football',
  initialState: {
    bestScored: [],
    standings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStandings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStandings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.standings = action.payload;
      })
      .addCase(fetchStandings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(bestScored.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bestScored.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bestScored = action.payload;
      })
      .addCase(bestScored.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
})

export default footballSlice.reducer;
