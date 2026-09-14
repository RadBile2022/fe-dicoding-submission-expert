import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { logout } from '../../states/auth/authSlice';
import Avatar from '../atoms/Avatar';

function Navigation() {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="brand" to="/">
          <span className="brand__mark">D</span>
          <span>Discussly</span>
        </Link>

        <nav className="nav-links" aria-label="Navigasi utama">
          <NavLink to="/" end>
            Threads
          </NavLink>
          <NavLink to="/leaderboards">
            Leaderboard
          </NavLink>
          {authUser && (
            <NavLink to="/new">
              Buat Thread
            </NavLink>
          )}
        </nav>

        <div className="auth-nav">
          {authUser ? (
            <>
              <div className="nav-user">
                <Avatar
                  src={authUser.avatar}
                  name={authUser.name}
                  size="small"
                />
                <span>{authUser.name}</span>
              </div>
              <button
                type="button"
                className="button button--ghost"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="button button--ghost" to="/login">
                Login
              </Link>
              <Link className="button" to="/register">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
