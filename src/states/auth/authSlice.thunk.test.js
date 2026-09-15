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
Skenario pengujian thunk asyncLoginUser:
1. Ketika login berhasil, token harus disimpan, profil dimuat, lalu dispatch fulfilled.
2. Ketika login gagal, token tidak boleh disimpan dan thunk harus dispatch rejected.
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

    expect(api.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(api.getOwnProfile).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe('auth/login/pending');
    expect(dispatch.mock.calls[1][0].type).toBe('auth/login/fulfilled');
    expect(dispatch.mock.calls[1][0].payload).toEqual(fakeUser);
  });

  it('should dispatch rejected and not save token when login fails', async () => {
    vi.spyOn(api, 'login').mockRejectedValue(new Error('Login gagal'));
    const putAccessTokenSpy = vi.spyOn(api, 'putAccessToken');
    const getOwnProfileSpy = vi.spyOn(api, 'getOwnProfile');
    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncLoginUser({
      email: 'wrong@example.com',
      password: 'wrong-password',
    })(dispatch, getState, undefined);

    expect(putAccessTokenSpy).not.toHaveBeenCalled();
    expect(getOwnProfileSpy).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe('auth/login/pending');
    expect(dispatch.mock.calls[1][0].type).toBe('auth/login/rejected');
    expect(dispatch.mock.calls[1][0].payload).toBe('Login gagal');
  });
});
