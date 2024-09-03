import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL


export const getTotalBalance = createAsyncThunk(
  'balance/getTotalBalance',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/total-balance/${userId}`, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Réponse complète de l\'API:', response.data)
      return response.data.totalBalance
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// Action pour déduire des tokens
export const deductTokens = createAsyncThunk(
  'balance/deductTokens',
  async ({ userId, amount }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/deduct-balance`, {
        userId,
        amount,
      }, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Réponse de l\'API après déduction des tokens:', response.data);
      return amount;  // Retourner le montant déduit pour mettre à jour le state localement
    } catch (error) {
      console.error('Erreur lors de la déduction des tokens:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    totalBalance: 0,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalBalance.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTotalBalance.fulfilled, (state, action) => {
        console.log('Payload de getTotalBalance:', action.payload);
        state.status = 'succeeded'
        state.totalBalance = action.payload
      })
      .addCase(getTotalBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })
      .addCase(deductTokens.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deductTokens.fulfilled, (state, action) => {
        console.log('Montant déduit:', action.payload);
        state.status = 'succeeded'
        state.totalBalance -= action.payload
      })
      .addCase(deductTokens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      });
  }
});

export default balanceSlice.reducer;
