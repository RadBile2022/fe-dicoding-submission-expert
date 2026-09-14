import React from 'react';
import PropTypes from 'prop-types';

function AuthTemplate({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

AuthTemplate.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
