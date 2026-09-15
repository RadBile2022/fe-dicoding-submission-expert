import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteButton from '../atoms/VoteButton';

function ThreadActions({
  thread,
  authUser,
  onVote,
  showComments,
}) {
  const isUpVoted = authUser
    ? thread.upVotesBy.includes(authUser.id)
    : false;
  const isDownVoted = authUser
    ? thread.downVotesBy.includes(authUser.id)
    : false;

  const handleVote = (type) => {
    if (!authUser) {
      onVote(thread, null);
      return;
    }

    let voteType = type;

    if (type === 1 && isUpVoted) {
      voteType = 0;
    }

    if (type === -1 && isDownVoted) {
      voteType = 0;
    }

    onVote(thread, voteType);
  };

  return (
    <div className="thread-actions">
      <VoteButton
        type="up"
        count={thread.upVotesBy.length}
        active={isUpVoted}
        onClick={() => handleVote(1)}
      />
      <VoteButton
        type="down"
        count={thread.downVotesBy.length}
        active={isDownVoted}
        onClick={() => handleVote(-1)}
      />
      {showComments && (
        <Link
          className="comment-count"
          to={`/threads/${thread.id}`}
          aria-label={`${thread.totalComments} komentar`}
        >
          <span aria-hidden="true">💬</span>
          <span>{thread.totalComments}</span>
        </Link>
      )}
    </div>
  );
}

ThreadActions.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    totalComments: PropTypes.number,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
  showComments: PropTypes.bool,
};

ThreadActions.defaultProps = {
  authUser: null,
  showComments: true,
};

export default ThreadActions;
