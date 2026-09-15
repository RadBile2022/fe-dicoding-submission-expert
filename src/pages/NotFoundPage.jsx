import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1>Halaman tidak ditemukan.</h1>
      <p>Alamat yang kamu buka tidak tersedia.</p>
      <Link className="button" to="/">
        Kembali ke beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
