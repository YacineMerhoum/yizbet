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

export const fetchHongrieSuisse = createAsyncThunk(
  'match/fetchHongrieSuisse',
  async () => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/matches/428746', {
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
export const fetchBetHongrieSuisse = createAsyncThunk(
  'match/fetchBetHongrieSuisse',
  async () => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_uefa_european_championship/events/5bdf2bcb696290e19ee29bd247d3bbf8/odds?regions=eu&oddsFormat=decimal&apiKey=f56585f41476b3254fc4da57dc3c2a8b');
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



// COTES DES MATCHS 
export const fetchBetEuro = createAsyncThunk(
  'match/fetchBetEuro',
  async () => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_uefa_european_championship/events/52cc97f3f972aff6eaf080168879d2b8/odds?regions=eu&oddsFormat=decimal&apiKey=f56585f41476b3254fc4da57dc3c2a8b');
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
export const fetchBetPorTche = createAsyncThunk(
  'match/fetchBetPorTche',
  async () => {
    try {
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_uefa_european_championship/events/0306e48b770a93617e4059d69e43aee2/odds?regions=eu&oddsFormat=decimal&apiKey=f56585f41476b3254fc4da57dc3c2a8b');
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

export const fetchMatch4 = createAsyncThunk(
  'match/fetchMatch4',
  async () => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/matches/428749', {
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
  match4: null,
  matchDetails: null,
  matchDetailsPortugal: null,
  hongrieSuisse: null,
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
  betHongrieSuisse: {
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
      .addCase(fetchMatchPortugal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatchPortugal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matchDetailsPortugal = action.payload;
      })
      .addCase(fetchMatchPortugal.rejected, (state, action) => {
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
      .addCase(fetchBetPorTche.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBetPorTche.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.BetPorTche = action.payload;
      })
      .addCase(fetchBetPorTche.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // MATCH HONGRIE SUISSE
      .addCase(fetchHongrieSuisse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHongrieSuisse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hongrieSuisse = action.payload;
      })
      .addCase(fetchHongrieSuisse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBetHongrieSuisse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBetHongrieSuisse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.betHongrieSuisse = action.payload;
      })
      .addCase(fetchBetHongrieSuisse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // MATCH 4
      .addCase(fetchMatch4.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatch4.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.match4 = action.payload;
      })
      .addCase(fetchMatch4.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  },
});

export default matchSlice.reducer;