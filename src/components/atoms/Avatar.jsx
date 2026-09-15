import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ src, name, size }) {
  if (!src) {
    return null;
  }

  return (
    <img
      className={`avatar avatar--${size}`}
      src={src}
      alt={`Avatar ${name}`}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Avatar.defaultProps = {
  src: null,
  size: 'medium',
};

export default Avatar;
