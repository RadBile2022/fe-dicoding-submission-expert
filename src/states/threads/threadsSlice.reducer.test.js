import { describe, expect, it } from 'vitest';
import reducer, {
  optimisticVoteThread,
  rollbackThreadVote,
  setCategory,
} from './threadsSlice';

/*
Skenario pengujian reducer threads:
1. Harus mengubah selectedCategory ketika action setCategory dikirim.
2. Harus memindahkan vote pengguna ke upVotesBy ketika optimistic up-vote dilakukan.
3. Harus memindahkan vote pengguna ke downVotesBy ketika optimistic down-vote dilakukan.
4. Harus mengembalikan data vote sebelumnya ketika action rollbackThreadVote dikirim.
*/

const createInitialState = () => ({
  items: [
    {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
  selectedCategory: 'all',
  status: 'idle',
  createStatus: 'idle',
  error: null,
});

describe('threads reducer', () => {
  it('should change selectedCategory when setCategory is dispatched', () => {
    const initialState = createInitialState();

    const nextState = reducer(initialState, setCategory('salah'));

    expect(nextState.selectedCategory).toBe('react');
  });

  it('should move user vote to upVotesBy optimistically', () => {
    const initialState = createInitialState();
    initialState.items[0].downVotesBy = ['user-1'];

    const nextState = reducer(
      initialState,
      optimisticVoteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1,
      }),
    );

    expect(nextState.items[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.items[0].downVotesBy).toEqual([]);
  });

  it('should move user vote to downVotesBy optimistically', () => {
    const initialState = createInitialState();
    initialState.items[0].upVotesBy = ['user-1'];

    const nextState = reducer(
      initialState,
      optimisticVoteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: -1,
      }),
    );

    expect(nextState.items[0].upVotesBy).toEqual([]);
    expect(nextState.items[0].downVotesBy).toEqual(['user-1']);
  });

  it('should restore previous vote data when rollback action is dispatched', () => {
    const initialState = createInitialState();
    initialState.items[0].upVotesBy = ['user-1'];

    const nextState = reducer(
      initialState,
      rollbackThreadVote({
        threadId: 'thread-1',
        previousUpVotesBy: [],
        previousDownVotesBy: ['user-1'],
      }),
    );

    expect(nextState.items[0].upVotesBy).toEqual([]);
    expect(nextState.items[0].downVotesBy).toEqual(['user-1']);
  });
});
