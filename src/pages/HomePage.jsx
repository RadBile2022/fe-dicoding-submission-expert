import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/molecules/CategoryFilter';
import ThreadList from '../components/organisms/ThreadList';
import {
  asyncReceiveThreads,
  asyncToggleThreadVote,
  setCategory,
} from '../states/threads/threadsSlice';
import { asyncReceiveUsers } from '../states/users/usersSlice';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: threads,
    selectedCategory,
    status,
    error,
  } = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users.items);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  const categories = useMemo(() => [
    ...new Set(
      threads
        .map((thread) => thread.category)
        .filter(Boolean),
    ),
  ], [threads]);

  const visibleThreads = useMemo(() => {
    if (selectedCategory === 'all') {
      return threads;
    }

    return threads.filter(
      (thread) => thread.category === selectedCategory,
    );
  }, [selectedCategory, threads]);

  const onVote = (thread, voteType) => {
    if (!authUser) {
      navigate('/login', {
        state: {
          message: 'Login diperlukan untuk memberikan vote.',
        },
      });
      return;
    }

    dispatch(
      asyncToggleThreadVote({
        threadId: thread.id,
        userId: authUser.id,
        voteType,
        previousUpVotesBy: [...thread.upVotesBy],
        previousDownVotesBy: [...thread.downVotesBy],
      }),
    );
  };

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">FORUM KOMUNITAS</span>
          <h1>Ide bagus tumbuh dari diskusi yang sehat.</h1>
          <p>
            Jelajahi thread, berbagi perspektif, dan temukan
            percakapan yang layak diikuti.
          </p>
        </div>

        {authUser ? (
          <Link className="button button--large" to="/new">
            + Buat Thread
          </Link>
        ) : (
          <Link className="button button--large" to="/login">
            Mulai berdiskusi
          </Link>
        )}
      </section>

      <section className="section-heading">
        <div>
          <h2>Diskusi terbaru</h2>
          <p>
            {visibleThreads.length}
            {' thread ditampilkan'}
          </p>
        </div>
      </section>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(category) => dispatch(setCategory(category))}
      />

      {status === 'failed' && (
        <div className="alert alert--error">
          {error || 'Gagal memuat thread.'}
        </div>
      )}

      {status === 'loading' && threads.length === 0 ? (
        <div className="empty-state">Memuat thread…</div>
      ) : (
        <ThreadList
          threads={visibleThreads}
          users={users}
          authUser={authUser}
          onVote={onVote}
        />
      )}
    </>
  );
}

export default HomePage;
