import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import stripHtml from '../../utils/stripHtml';
import VoteButton from '../atoms/VoteButton';
import UserInfo from '../molecules/UserInfo';

function CommentCard({
  comment,
  authUser,
  onVote,
}) {
  const isUpVoted = authUser
    ? comment.upVotesBy.includes(authUser.id)
    : false;
  const isDownVoted = authUser
    ? comment.downVotesBy.includes(authUser.id)
    : false;

  const handleVote = (type) => {
    if (!authUser) {
      onVote(comment, null);
      return;
    }

    let voteType = type;

    if (type === 1 && isUpVoted) {
      voteType = 0;
    }

    if (type === -1 && isDownVoted) {
      voteType = 0;
    }

    onVote(comment, voteType);
  };

  return (
    <article className="comment-card">
      <div className="comment-card__header">
        <UserInfo user={comment.owner} />
        <small className="comment-card__time">
          {formatDate(comment.createdAt)}
        </small>
      </div>

      <p className="rich-content">
        {stripHtml(comment.content)}
      </p>

      <div className="comment-card__votes">
        <VoteButton
          type="up"
          count={comment.upVotesBy.length}
          active={isUpVoted}
          onClick={() => handleVote(1)}
        />
        <VoteButton
          type="down"
          count={comment.downVotesBy.length}
          active={isDownVoted}
          onClick={() => handleVote(-1)}
        />
      </div>
    </article>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

CommentCard.defaultProps = {
  authUser: null,
};

export default CommentCard;
