import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMatchDetails = createAsyncThunk(
  'match/fetchMatchDetails',
  async () => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/matches/428764', {
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

export const fetchMatchPortugal = createAsyncThunk(
  'match/fetchMatchPortugal',
  async () => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/matches/428777', {
        headers: {
          'X-Auth-Token': '1a93aed1ad8b40d1af324616d76267c1'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Match du Portugal non trouvé !');
    }
  }
);

const initialState = {
  matchDetails: null,
  matchDetailsPortugal: null, 
  status: 'idle',
  error: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matchDetails = action.payload;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Ajoute les gestionnaires d'action pour fetchMatchPortugal
      .addCase(fetchMatchPortugal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatchPortugal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matchDetailsPortugal = action.payload; // Stocke les détails du match du Portugal
      })
      .addCase(fetchMatchPortugal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default matchSlice.reducer;
