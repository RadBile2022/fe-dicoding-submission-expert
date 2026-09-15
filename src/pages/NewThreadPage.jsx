import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../states/threads/threadsSlice';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStatus = useSelector(
    (state) => state.threads.createStatus,
  );
  const error = useSelector((state) => state.threads.error);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      asyncCreateThread({
        title: title.trim(),
        category: category.trim() || 'general',
        body: body.trim(),
      }),
    );

    if (asyncCreateThread.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <section className="form-page">
      <div className="form-page__intro">
        <span className="eyebrow">THREAD BARU</span>
        <h1>Mulai percakapan yang berarti.</h1>
        <p>
          Gunakan judul yang jelas dan berikan konteks yang cukup
          agar anggota lain mudah ikut berdiskusi.
        </p>
      </div>

      <form className="form-card" onSubmit={onSubmit}>
        <label htmlFor="thread-title">
          Judul
          <input
            id="thread-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Contoh: Bagaimana belajar Redux dengan efektif?"
            required
          />
        </label>

        <label htmlFor="thread-category">
          Kategori
          <input
            id="thread-category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="react, redux, career..."
          />
        </label>

        <label htmlFor="thread-body">
          Isi thread
          <textarea
            id="thread-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows="10"
            placeholder="Ceritakan konteks atau pertanyaanmu..."
            required
          />
        </label>

        {createStatus === 'failed' && (
          <div className="alert alert--error">
            {error || 'Gagal membuat thread.'}
          </div>
        )}

        <button
          type="submit"
          className="button button--large"
          disabled={
            createStatus === 'loading'
            || !title.trim()
            || !body.trim()
          }
        >
          {createStatus === 'loading'
            ? 'Menerbitkan…'
            : 'Terbitkan Thread'}
        </button>
      </form>
    </section>
  );
}

export default NewThreadPage;
