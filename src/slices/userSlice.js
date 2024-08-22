import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action pour récupérer le total de la balance
export const getUser = createAsyncThunk(
  'user/getUser',
  async (uid, thunkAPI) => {
    console.log(uid)
    try {
      const response = await axios.get(`http://localhost:3008/user/${uid}`, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Réponse complète de l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload   // Met à jour la balance en déduisant les tokens (diviser par 100 pour convertir)
      })
  }
});

export default userSlice.reducer;
