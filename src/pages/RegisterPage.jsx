import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import {
  asyncRegisterUser,
  clearAuthError,
} from '../states/auth/authSlice';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const nameRegister = register('name', {
    required: 'Nama wajib diisi.',
  });
  const emailRegister = register('email', {
    required: 'Email wajib diisi.',
  });
  const passwordRegister = register('password', {
    required: 'Password wajib diisi.',
    minLength: {
      value: 6,
      message: 'Password minimal 6 karakter.',
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(asyncRegisterUser(data));

    if (asyncRegisterUser.fulfilled.match(resultAction)) {
      navigate('/login', {
        state: {
          message: 'Registrasi berhasil. Silakan login.',
        },
      });
    }
  };

  return (
    <AuthTemplate
      eyebrow="BERGABUNG"
      title="Satu akun untuk banyak percakapan."
      description="Buat akun gratis dan jadilah bagian dari diskusi."
    >
      <form
        className="form-card auth-card"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Daftar</h2>

        <label htmlFor="register-name">
          Nama
          <input
            id="register-name"
            type="text"
            name={nameRegister.name}
            ref={nameRegister.ref}
            onBlur={nameRegister.onBlur}
            onChange={nameRegister.onChange}
            autoComplete="name"
          />
        </label>
        {errors.name && (
          <p className="form-error" role="alert">
            {errors.name.message}
          </p>
        )}

        <label htmlFor="register-email">
          Email
          <input
            id="register-email"
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

        <label htmlFor="register-password">
          Password
          <input
            id="register-password"
            type="password"
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            onBlur={passwordRegister.onBlur}
            onChange={passwordRegister.onChange}
            autoComplete="new-password"
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
          type="submit"
          className="button button--large button--full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Mendaftarkan…' : 'Buat akun'}
        </button>

        <p className="form-switch">
          <span>Sudah punya akun?</span>
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthTemplate>
  );
}

export default RegisterPage;
