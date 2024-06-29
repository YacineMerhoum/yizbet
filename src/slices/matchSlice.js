import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { keysOdd } from '../dataAPI/keysOdd';
import tf1 from "../images/TV/TF1-logo.png"



// CAROUSEL 1
export const fetchMatchDetails = createAsyncThunk(
  'match/fetchMatchDetails',
  async () => {
    
      const response = await axios.get('http://localhost:3007/data/matchesRoute.json', {
        
      });
      return response.data;
    }
  
);

export const oddsMatchs = createAsyncThunk(
  'match/oddsMatchs',
  async () => {
    
    const response = await axios.get('http://localhost:3007/data/matchesOdds.json', {
      
    });
    return response.data;
  }

);




// COTES DES MATCHS 
export const fetchBetEuro = createAsyncThunk(
  'match/fetchBetEuro',
  async () => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_uefa_european_championship/events/52cc97f3f972aff6eaf080168879d2b8/odds?regions=eu&oddsFormat=decimal&apiKey=98ff544b7a7c7c2b7ab4885362a8c174');
      const oddsData = response.data;
      const homeTeamOdds = oddsData?.bookmakers[0]?.markets[0]?.outcomes[0]?.price || null;
      const awayTeamOdds = oddsData?.bookmakers[0]?.markets[0]?.outcomes[1]?.price || null;
      const drawOdds = oddsData?.bookmakers[0]?.markets[0]?.outcomes[2]?.price || null;
      return {
        homeTeamOdds,
        drawOdds,
        awayTeamOdds,
      };
    } catch (error) {
      throw new Error('Côtes non disponibles');
    }
  }
);





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
        state.matchDetails = action.payload;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      
      .addCase(fetchBetEuro.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBetEuro.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.betEuro = action.payload;
      })
      .addCase(fetchBetEuro.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      
      // TEST JSON
      .addCase(oddsMatchs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(oddsMatchs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.betGames = action.payload;
      })
      .addCase(oddsMatchs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      

  },
});

export default matchSlice.reducer;
export const { setChannelTv } = matchSlice.actions;
