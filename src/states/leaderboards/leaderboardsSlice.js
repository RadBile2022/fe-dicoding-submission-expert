import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const asyncReceiveLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getLeaderboards();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveLeaderboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncReceiveLeaderboards.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(asyncReceiveLeaderboards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default leaderboardsSlice.reducer;
