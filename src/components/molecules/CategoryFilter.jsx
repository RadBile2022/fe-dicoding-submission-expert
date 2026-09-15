import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="category-filter" aria-label="Filter kategori">
      <button
        type="button"
        className={selectedCategory === 'all' ? 'chip chip--active' : 'chip'}
        onClick={() => onSelect('all')}
      >
        Semua
      </button>

      {categories.map((category) => {
        const className = selectedCategory === category
          ? 'chip chip--active'
          : 'chip';

        return (
          <button
            key={category}
            type="button"
            className={className}
            onClick={() => onSelect(category)}
          >
            #
            {category}
          </button>
        );
      })}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
