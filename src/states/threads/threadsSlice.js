import {
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  items: [],
  selectedCategory: 'all',
  status: 'idle',
  createStatus: 'idle',
  error: null,
};

export const optimisticVoteThread = createAction(
  'threads/optimisticVoteThread',
);
export const rollbackThreadVote = createAction(
  'threads/rollbackThreadVote',
);

export const asyncReceiveThreads = createAsyncThunk(
  'threads/receiveThreads',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllThreads();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.createThread(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncToggleThreadVote = createAsyncThunk(
  'threads/toggleVote',
  async (
    {
      threadId,
      userId,
      voteType,
      previousUpVotesBy,
      previousDownVotesBy,
    },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(
      optimisticVoteThread({
        threadId,
        userId,
        voteType,
      }),
    );

    try {
      await api.voteThread({ threadId, voteType });
      return { threadId };
    } catch (error) {
      dispatch(
        rollbackThreadVote({
          threadId,
          previousUpVotesBy,
          previousDownVotesBy,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(optimisticVoteThread, (state, action) => {
        const { threadId, userId, voteType } = action.payload;
        const thread = state.items.find((item) => item.id === threadId);

        if (!thread) {
          return;
        }

        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

        if (voteType === 1) {
          thread.upVotesBy.push(userId);
        }

        if (voteType === -1) {
          thread.downVotesBy.push(userId);
        }
      })
      .addCase(rollbackThreadVote, (state, action) => {
        const {
          threadId,
          previousUpVotesBy,
          previousDownVotesBy,
        } = action.payload;
        const thread = state.items.find((item) => item.id === threadId);

        if (!thread) {
          return;
        }

        thread.upVotesBy = previousUpVotesBy;
        thread.downVotesBy = previousDownVotesBy;
      })
      .addCase(asyncReceiveThreads.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(asyncReceiveThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.createStatus = 'success';
        state.items.unshift(action.payload);
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCategory } = threadsSlice.actions;
export default threadsSlice.reducer;
