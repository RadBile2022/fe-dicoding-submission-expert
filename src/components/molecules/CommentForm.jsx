import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentForm({ onSubmit, disabled }) {
  const [content, setContent] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    onSubmit(content.trim());
    setContent('');
  };

  return (
    <form className="composer" onSubmit={submitHandler}>
      <label htmlFor="comment-content">
        Tulis komentar
        <textarea
          id="comment-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Bagikan pendapatmu…"
          rows="4"
          required
        />
      </label>
      <button
        type="submit"
        className="button"
        disabled={disabled || !content.trim()}
      >
        {disabled ? 'Mengirim…' : 'Kirim komentar'}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CommentForm.defaultProps = {
  disabled: false,
};

export default CommentForm;
