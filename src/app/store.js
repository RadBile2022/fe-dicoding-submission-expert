import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/auth/authSlice';
import leaderboardsReducer from '../states/leaderboards/leaderboardsSlice';
import threadDetailReducer from '../states/threadDetail/threadDetailSlice';
import threadsReducer from '../states/threads/threadsSlice';
import usersReducer from '../states/users/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
