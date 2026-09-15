import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../atoms/Avatar';

function UserInfo({ user, label, large }) {
  const name = user?.name || 'Unknown user';
  const className = large
    ? 'thread-owner thread-owner--large'
    : 'thread-owner';

  return (
    <div className={className}>
      <Avatar
        src={user?.avatar}
        name={name}
        size={large ? 'large' : 'medium'}
      />
      <div>
        {label && <small>{label}</small>}
        <strong>{name}</strong>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  label: PropTypes.string,
  large: PropTypes.bool,
};

UserInfo.defaultProps = {
  user: null,
  label: '',
  large: false,
};

export default UserInfo;
