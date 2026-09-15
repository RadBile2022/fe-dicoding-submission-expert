import {
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  data: null,
  status: 'idle',
  commentStatus: 'idle',
  error: null,
};

export const optimisticVoteDetailThread = createAction(
  'threadDetail/optimisticVoteDetailThread',
);
export const rollbackDetailThreadVote = createAction(
  'threadDetail/rollbackDetailThreadVote',
);
export const optimisticVoteComment = createAction(
  'threadDetail/optimisticVoteComment',
);
export const rollbackCommentVote = createAction(
  'threadDetail/rollbackCommentVote',
);

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId, { rejectWithValue }) => {
    try {
      return await api.getThreadDetail(threadId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/addComment',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.createComment(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncToggleDetailThreadVote = createAsyncThunk(
  'threadDetail/toggleThreadVote',
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
      optimisticVoteDetailThread({
        userId,
        voteType,
      }),
    );

    try {
      await api.voteThread({ threadId, voteType });
      return { threadId };
    } catch (error) {
      dispatch(
        rollbackDetailThreadVote({
          previousUpVotesBy,
          previousDownVotesBy,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);

export const asyncToggleCommentVote = createAsyncThunk(
  'threadDetail/toggleCommentVote',
  async (
    {
      threadId,
      commentId,
      userId,
      voteType,
      previousUpVotesBy,
      previousDownVotesBy,
    },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(
      optimisticVoteComment({
        commentId,
        userId,
        voteType,
      }),
    );

    try {
      await api.voteComment({
        threadId,
        commentId,
        voteType,
      });
      return { commentId };
    } catch (error) {
      dispatch(
        rollbackCommentVote({
          commentId,
          previousUpVotesBy,
          previousDownVotesBy,
        }),
      );
      return rejectWithValue(error.message);
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(optimisticVoteDetailThread, (state, action) => {
        if (!state.data) {
          return;
        }

        const { userId, voteType } = action.payload;
        state.data.upVotesBy = state.data.upVotesBy.filter(
          (id) => id !== userId,
        );
        state.data.downVotesBy = state.data.downVotesBy.filter(
          (id) => id !== userId,
        );

        if (voteType === 1) {
          state.data.upVotesBy.push(userId);
        }

        if (voteType === -1) {
          state.data.downVotesBy.push(userId);
        }
      })
      .addCase(rollbackDetailThreadVote, (state, action) => {
        if (!state.data) {
          return;
        }

        state.data.upVotesBy = action.payload.previousUpVotesBy;
        state.data.downVotesBy = action.payload.previousDownVotesBy;
      })
      .addCase(optimisticVoteComment, (state, action) => {
        if (!state.data) {
          return;
        }

        const { commentId, userId, voteType } = action.payload;
        const comment = state.data.comments.find(
          (item) => item.id === commentId,
        );

        if (!comment) {
          return;
        }

        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter(
          (id) => id !== userId,
        );

        if (voteType === 1) {
          comment.upVotesBy.push(userId);
        }

        if (voteType === -1) {
          comment.downVotesBy.push(userId);
        }
      })
      .addCase(rollbackCommentVote, (state, action) => {
        if (!state.data) {
          return;
        }

        const comment = state.data.comments.find(
          (item) => item.id === action.payload.commentId,
        );

        if (!comment) {
          return;
        }

        comment.upVotesBy = action.payload.previousUpVotesBy;
        comment.downVotesBy = action.payload.previousDownVotesBy;
      })
      .addCase(asyncReceiveThreadDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(asyncReceiveThreadDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(asyncAddComment.pending, (state) => {
        state.commentStatus = 'loading';
      })
      .addCase(asyncAddComment.fulfilled, (state, action) => {
        state.commentStatus = 'success';
        state.data.comments.unshift(action.payload);
      })
      .addCase(asyncAddComment.rejected, (state, action) => {
        state.commentStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearThreadDetail } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
