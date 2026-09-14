import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import CategoryBadge from '../atoms/CategoryBadge';

function ThreadMeta({ category, createdAt }) {
  return (
    <div className="thread-card__meta">
      <CategoryBadge category={category} />
      <span>{formatDate(createdAt)}</span>
    </div>
  );
}

ThreadMeta.propTypes = {
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

ThreadMeta.defaultProps = {
  category: 'general',
};

export default ThreadMeta;
