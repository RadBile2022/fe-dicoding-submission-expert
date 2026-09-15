import React from 'react';
import PropTypes from 'prop-types';

function VoteButton({
  type,
  count,
  active,
  onClick,
}) {
  const icon = type === 'up' ? '▲' : '▼';
  const label = type === 'up' ? 'Up-vote' : 'Down-vote';
  const className = active
    ? 'vote-button vote-button--active'
    : 'vote-button';

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${label}, ${count} vote`}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{count}</span>
    </button>
  );
}

VoteButton.propTypes = {
  type: PropTypes.oneOf(['up', 'down']).isRequired,
  count: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VoteButton;
