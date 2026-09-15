import React from 'react';
import PropTypes from 'prop-types';
import stripHtml from '../../utils/stripHtml';
import ThreadActions from '../molecules/ThreadActions';
import ThreadMeta from '../molecules/ThreadMeta';
import UserInfo from '../molecules/UserInfo';

function ThreadDetailCard({
  thread,
  authUser,
  onVote,
}) {
  return (
    <article className="thread-detail">
      <ThreadMeta
        category={thread.category}
        createdAt={thread.createdAt}
      />

      <h1>{thread.title}</h1>

      <UserInfo
        user={thread.owner}
        label="Dibuat oleh"
        large
      />

      <p className="rich-content rich-content--thread">
        {stripHtml(thread.body)}
      </p>

      <div className="detail-votes">
        <ThreadActions
          thread={thread}
          authUser={authUser}
          onVote={onVote}
          showComments={false}
        />
      </div>
    </article>
  );
}

ThreadDetailCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number,
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

ThreadDetailCard.defaultProps = {
  authUser: null,
};

export default ThreadDetailCard;
