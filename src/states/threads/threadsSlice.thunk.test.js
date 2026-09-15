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
Skenario pengujian thunk asyncReceiveThreads:
1. Ketika API berhasil, harus dispatch pending lalu fulfilled dengan data threads.
2. Ketika API gagal, harus dispatch pending lalu rejected dengan pesan error.
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

    expect(api.getAllThreads).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      'threads/receiveThreads/pending',
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      'threads/receiveThreads/fulfilled',
    );
    expect(dispatch.mock.calls[1][0].payload).toEqual(fakeThreads);
  });

  it('should dispatch pending and rejected when API fails', async () => {
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(
      new Error('Gagal memuat threads'),
    );
    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncReceiveThreads()(dispatch, getState, undefined);

    expect(api.getAllThreads).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      'threads/receiveThreads/pending',
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      'threads/receiveThreads/rejected',
    );
    expect(dispatch.mock.calls[1][0].payload).toBe('Gagal memuat threads');
  });
});
