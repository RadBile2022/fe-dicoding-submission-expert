import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../atoms/Avatar';

function LeaderboardList({ items, loading }) {
  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <span>Pengguna</span>
        <span>Score</span>
      </div>

      {items.map((item, index) => (
        <article className="leaderboard__item" key={item.user.id}>
          <div className="leaderboard__identity">
            <span className="leaderboard__rank">
              {index + 1}
            </span>
            <Avatar
              src={item.user.avatar}
              name={item.user.name}
              size="large"
            />
            <strong>{item.user.name}</strong>
          </div>
          <strong className="leaderboard__score">
            {item.score}
          </strong>
        </article>
      ))}

      {loading && items.length === 0 && (
        <div className="empty-state">Memuat leaderboard…</div>
      )}
    </div>
  );
}

LeaderboardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LeaderboardList;
