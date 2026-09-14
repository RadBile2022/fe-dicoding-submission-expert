import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import api from '../../services/api';
import { asyncReceiveThreads } from './threadsSlice';

/*
Skenario thunk asyncReceiveThreads:
1. Jika API berhasil, thunk harus dispatch pending lalu fulfilled dengan data threads.
2. API getAllThreads dimock agar pengujian tidak bergantung pada jaringan.
*/

describe('asyncReceiveThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch pending and fulfilled when API succeeds', async () => {
    const fakeThreads = [{ id: 'thread-1', title: 'Redux Testing' }];
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreads);
    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncReceiveThreads()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      'threads/receiveThreads/pending',
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      'threads/receiveThreads/fulfilled',
    );
    expect(dispatch.mock.calls[1][0].payload).toEqual(fakeThreads);
  });
});
