import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import api from '../../services/api';
import { asyncLoginUser } from './authSlice';

/*
Skenario thunk asyncLoginUser:
1. Jika login berhasil, token harus disimpan dan profil pengguna dimuat.
2. Thunk harus dispatch pending lalu fulfilled dengan profil pengguna.
*/

describe('asyncLoginUser thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should save token and dispatch fulfilled with user profile', async () => {
    const fakeUser = {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
    };
    vi.spyOn(api, 'login').mockResolvedValue('fake-token');
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser);
    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncLoginUser({
      email: 'test@example.com',
      password: 'secret123',
    })(dispatch, getState, undefined);

    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe('auth/login/pending');
    expect(dispatch.mock.calls[1][0].type).toBe('auth/login/fulfilled');
    expect(dispatch.mock.calls[1][0].payload).toEqual(fakeUser);
  });
});
