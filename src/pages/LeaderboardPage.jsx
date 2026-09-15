import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/organisms/LeaderboardList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/leaderboardsSlice';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const {
    items,
    status,
    error,
  } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">LEADERBOARD</span>
        <h1>Kontributor teratas</h1>
        <p>
          Pengguna dengan kontribusi dan aktivitas terbaik di komunitas.
        </p>
      </div>

      {status === 'failed' && (
        <div className="alert alert--error">
          {error || 'Gagal memuat leaderboard.'}
        </div>
      )}

      <LeaderboardList
        items={items}
        loading={status === 'loading'}
      />
    </section>
  );
}

export default LeaderboardPage;
