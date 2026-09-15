import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const asyncReceiveUsers = createAsyncThunk(
  'users/receiveUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncReceiveUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(asyncReceiveUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
