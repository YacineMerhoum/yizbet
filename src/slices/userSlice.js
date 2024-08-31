import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;


export const getUser = createAsyncThunk(
  'user/getUser',
  async (uid, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/user/${uid}`, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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
        state.user = action.payload;
      })
  }
});

export default userSlice.reducer;
