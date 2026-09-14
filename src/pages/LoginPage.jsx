import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import {
  asyncLoginUser,
  clearAuthError,
} from '../states/auth/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    user,
    status,
    error,
  } = useSelector((state) => state.auth);

  const emailRegister = register('email', {
    required: 'Email wajib diisi.',
  });
  const passwordRegister = register('password', {
    required: 'Password wajib diisi.',
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || '/', { replace: true });
    }
  }, [location.state, navigate, user]);

  const onSubmit = (data) => {
    dispatch(asyncLoginUser(data));
  };

  return (
    <AuthTemplate
      eyebrow="SELAMAT DATANG"
      title="Masuk dan lanjutkan percakapan."
      description="Vote thread favoritmu, berikan komentar, atau mulai diskusi baru."
    >
      <form
        className="form-card auth-card"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login</h2>

        {location.state?.message && (
          <div className="alert">
            {location.state.message}
          </div>
        )}

        <label htmlFor="login-email">
          Email
          <input
            id="login-email"
            type="email"
            name={emailRegister.name}
            ref={emailRegister.ref}
            onBlur={emailRegister.onBlur}
            onChange={emailRegister.onChange}
            autoComplete="email"
          />
        </label>
        {errors.email && (
          <p className="form-error" role="alert">
            {errors.email.message}
          </p>
        )}

        <label htmlFor="login-password">
          Password
          <input
            id="login-password"
            type="password"
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            onBlur={passwordRegister.onBlur}
            onChange={passwordRegister.onChange}
            autoComplete="current-password"
          />
        </label>
        {errors.password && (
          <p className="form-error" role="alert">
            {errors.password.message}
          </p>
        )}

        {error && (
          <div className="alert alert--error">
            {error}
          </div>
        )}

        <button
          className="button button--large button--full"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Masuk…' : 'Login'}
        </button>

        <p className="form-switch">
          <span>Belum punya akun?</span>
          {' '}
          <Link to="/register">Daftar</Link>
        </p>
      </form>
    </AuthTemplate>
  );
}

export default LoginPage;
