import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isPreload: true,
};

export const asyncRegisterUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      await api.register(payload);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncLoginUser = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const token = await api.login(payload);
      api.putAccessToken(token);
      const user = await api.getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncPreloadProcess = createAsyncThunk(
  'auth/preload',
  async (_, { rejectWithValue }) => {
    const token = api.getAccessToken();

    if (!token) {
      return null;
    }

    try {
      return await api.getOwnProfile();
    } catch (error) {
      api.removeAccessToken();
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      api.removeAccessToken();
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login gagal.';
      })
      .addCase(asyncRegisterUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registrasi gagal.';
      })
      .addCase(asyncPreloadProcess.pending, (state) => {
        state.isPreload = true;
      })
      .addCase(asyncPreloadProcess.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPreload = false;
      })
      .addCase(asyncPreloadProcess.rejected, (state) => {
        state.user = null;
        state.isPreload = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
