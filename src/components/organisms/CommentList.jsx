import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';

function CommentList({
  comments,
  authUser,
  onVote,
}) {
  if (comments.length === 0) {
    return (
      <div className="empty-state">
        Belum ada komentar. Jadilah yang pertama.
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          authUser={authUser}
          onVote={onVote}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  authUser: null,
};

export default CommentList;
