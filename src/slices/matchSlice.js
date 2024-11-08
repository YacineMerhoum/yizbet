import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tf1 from "../images/TV/TF1-logo.png"


const API_URL = process.env.REACT_APP_API_URL


// CAROUSEL 1
export const fetchMatchDetails = createAsyncThunk(
  'match/fetchMatchDetails',
  async () => {
    
      const response = await axios.get(`${API_URL}/data/matchesRoute.json`, {
        
      })
      return response.data;
    }
  
);

export const oddsMatchs = createAsyncThunk(
  'match/oddsMatchs',
  async () => {
    
    const response = await axios.get(`${API_URL}/data/matchesOdds.json`, {
      
    });
    return response.data;
  }

)

// COTES DES MATCHS 
const initialState = {
  channelTv: {
    tf1: tf1,
  },
  match4: null,
  matchDetails: null,
  betEuro: {
    homeTeamOdds: null,
    drawOdds: null,
    awayTeamOdds: null,
  },
  BetPorTche: {
    homeTeamOdds: null,
    drawOdds: null,
    awayTeamOdds: null,
  },
  betGames: null,
  oddsMatch4: {
    homeTeamOdds: null,
    drawOdds: null,
    awayTeamOdds: null,
  },
  status: 'idle',
  error: null,
  
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setChannelTv(state, action) {
      state.channelTv = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matchDetails = action.payload
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })

      
      // TEST JSON
      .addCase(oddsMatchs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(oddsMatchs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.betGames = action.payload
      })
      .addCase(oddsMatchs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      
  },
})

export default matchSlice.reducer
export const { setChannelTv } = matchSlice.actions
