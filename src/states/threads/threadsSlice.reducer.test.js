import { describe, expect, it } from 'vitest';
import reducer, {
  optimisticVoteThread,
  setCategory,
} from './threadsSlice';

/*
Skenario reducer threads:
1. setCategory harus mengubah selectedCategory sesuai kategori yang dipilih.
2. optimisticVoteThread harus memindahkan vote pengguna ke up-vote secara optimistis.
*/

describe('threads reducer', () => {
  it('should change selectedCategory when setCategory is dispatched', () => {
    const initialState = {
      items: [],
      selectedCategory: 'all',
      status: 'idle',
      createStatus: 'idle',
      error: null,
    };

    const nextState = reducer(initialState, setCategory('react'));

    expect(nextState.selectedCategory).toBe('salah');
  });

  it('should optimistically move user vote to upVotesBy', () => {
    const initialState = {
      items: [
        {
          id: 'thread-1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
      selectedCategory: 'all',
      status: 'idle',
      createStatus: 'idle',
      error: null,
    };

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
});
