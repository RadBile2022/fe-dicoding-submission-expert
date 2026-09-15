import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import stripHtml from '../../utils/stripHtml';
import ThreadActions from '../molecules/ThreadActions';
import ThreadMeta from '../molecules/ThreadMeta';
import UserInfo from '../molecules/UserInfo';

function ThreadCard({
  thread,
  owner,
  authUser,
  onVote,
}) {
  const plainBody = stripHtml(thread.body);
  const bodyPreview = plainBody.slice(0, 180);
  const suffix = plainBody.length > 180 ? '…' : '';

  return (
    <article className="thread-card">
      <ThreadMeta
        category={thread.category}
        createdAt={thread.createdAt}
      />

      <Link className="thread-card__title" to={`/threads/${thread.id}`}>
        {thread.title}
      </Link>

      <p className="thread-card__excerpt">
        {bodyPreview}
        {suffix}
      </p>

      <div className="thread-card__footer">
        <UserInfo user={owner} label="Dibuat oleh" />
        <ThreadActions
          thread={thread}
          authUser={authUser}
          onVote={onVote}
        />
      </div>
    </article>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

ThreadCard.defaultProps = {
  owner: null,
  authUser: null,
};

export default ThreadCard;
