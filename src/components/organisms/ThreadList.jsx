import React from 'react';
import PropTypes from 'prop-types';
import ThreadCard from './ThreadCard';

function ThreadList({
  threads,
  users,
  authUser,
  onVote,
}) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        Tidak ada thread pada kategori ini.
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);

        return (
          <ThreadCard
            key={thread.id}
            thread={thread}
            owner={owner}
            authUser={authUser}
            onVote={onVote}
          />
        );
      })}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = {
  authUser: null,
};

export default ThreadList;
