import React from 'react';
import { Outlet } from 'react-router-dom';
import LoadingBar from '../atoms/LoadingBar';
import Navigation from '../organisms/Navigation';

function AppLayout() {
  return (
    <div className="app-shell">
      <LoadingBar />
      <Navigation />
      <main className="page-container">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Discussly · React + Redux Forum</p>
      </footer>
    </div>
  );
}

export default AppLayout;
