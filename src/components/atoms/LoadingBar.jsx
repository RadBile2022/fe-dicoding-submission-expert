import React from 'react';
import { useSelector } from 'react-redux';

function LoadingBar() {
  const isLoading = useSelector((state) => {
    const statuses = [
      state.auth.status,
      state.users.status,
      state.threads.status,
      state.threads.createStatus,
      state.threadDetail.status,
      state.threadDetail.commentStatus,
      state.leaderboards.status,
    ];

    return statuses.includes('loading');
  });

  const className = isLoading
    ? 'loading-bar loading-bar--active'
    : 'loading-bar';

  return (
    <div
      className={className}
      aria-hidden={!isLoading}
    >
      <div className="loading-bar__fill" />
    </div>
  );
}

export default LoadingBar;
