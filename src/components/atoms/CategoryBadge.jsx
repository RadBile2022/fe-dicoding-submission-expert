import React from 'react';
import PropTypes from 'prop-types';

function CategoryBadge({ category }) {
  return (
    <span className="category-badge">
      #
      {category || 'general'}
    </span>
  );
}

CategoryBadge.propTypes = {
  category: PropTypes.string,
};

CategoryBadge.defaultProps = {
  category: 'general',
};

export default CategoryBadge;
