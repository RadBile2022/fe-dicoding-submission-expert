import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import CommentForm from '../components/molecules/CommentForm';
import CommentList from '../components/organisms/CommentList';
import ThreadDetailCard from '../components/organisms/ThreadDetailCard';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleCommentVote,
  asyncToggleDetailThreadVote,
  clearThreadDetail,
} from '../states/threadDetail/threadDetailSlice';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: thread,
    status,
    commentStatus,
    error,
  } = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, threadId]);

  const requireLogin = () => {
    navigate('/login', {
      state: {
        message: 'Login diperlukan untuk berinteraksi.',
      },
    });
  };

  const handleThreadVote = (selectedThread, requestedVoteType) => {
    if (!authUser) {
      requireLogin();
      return;
    }

    const isUpVoted = selectedThread.upVotesBy.includes(authUser.id);
    const isDownVoted = selectedThread.downVotesBy.includes(authUser.id);
    let voteType = requestedVoteType;

    if (requestedVoteType === 1 && isUpVoted) {
      voteType = 0;
    }

    if (requestedVoteType === -1 && isDownVoted) {
      voteType = 0;
    }

    dispatch(
      asyncToggleDetailThreadVote({
        threadId,
        userId: authUser.id,
        voteType,
        previousUpVotesBy: [...selectedThread.upVotesBy],
        previousDownVotesBy: [...selectedThread.downVotesBy],
      }),
    );
  };

  const handleCommentVote = (comment, requestedVoteType) => {
    if (!authUser) {
      requireLogin();
      return;
    }

    const isUpVoted = comment.upVotesBy.includes(authUser.id);
    const isDownVoted = comment.downVotesBy.includes(authUser.id);
    let voteType = requestedVoteType;

    if (requestedVoteType === 1 && isUpVoted) {
      voteType = 0;
    }

    if (requestedVoteType === -1 && isDownVoted) {
      voteType = 0;
    }

    dispatch(
      asyncToggleCommentVote({
        threadId,
        commentId: comment.id,
        userId: authUser.id,
        voteType,
        previousUpVotesBy: [...comment.upVotesBy],
        previousDownVotesBy: [...comment.downVotesBy],
      }),
    );
  };

  const handleAddComment = (content) => {
    dispatch(asyncAddComment({ threadId, content }));
  };

  if (status === 'loading' && !thread) {
    return <div className="empty-state">Memuat detail thread…</div>;
  }

  if (status === 'failed') {
    return (
      <div className="alert alert--error">
        {error || 'Gagal memuat thread.'}
      </div>
    );
  }

  if (!thread) {
    return null;
  }

  return (
    <div className="detail-layout">
      <Link className="back-link" to="/">
        ← Kembali ke semua thread
      </Link>

      <ThreadDetailCard
        thread={thread}
        authUser={authUser}
        onVote={handleThreadVote}
      />

      <section className="comments-section">
        <div className="section-heading">
          <div>
            <h2>Komentar</h2>
            <p>
              {thread.comments.length}
              {' tanggapan'}
            </p>
          </div>
        </div>

        {authUser ? (
          <CommentForm
            onSubmit={handleAddComment}
            disabled={commentStatus === 'loading'}
          />
        ) : (
          <div className="login-prompt">
            <p>Login untuk ikut berdiskusi.</p>
            <Link className="button" to="/login">
              Login
            </Link>
          </div>
        )}

        <CommentList
          comments={thread.comments}
          authUser={authUser}
          onVote={handleCommentVote}
        />
      </section>
    </div>
  );
}

export default ThreadDetailPage;
