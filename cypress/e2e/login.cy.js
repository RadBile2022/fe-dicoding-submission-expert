/*
Skenario E2E login:
1. Sebelum pengujian, buat akun pengujian unik melalui Dicoding Forum API.
2. Buka halaman /login.
3. Isi email dan password akun pengujian.
4. Tekan tombol Login.
5. Pastikan pengguna berhasil kembali ke halaman utama dan nama akun tampil.
*/

describe('Login flow', () => {
  const password = 'testing123';
  const testUser = {
    name: 'Discussly E2E User',
    email: `discussly-e2e-${Date.now()}@example.com`,
    password,
  };

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://forum-api.dicoding.dev/v1/register',
      body: testUser,
    });
  });

  it('should login successfully using valid credentials', () => {
    cy.visit('/login');

    cy.get('#login-email').type(testUser.email);
    cy.get('#login-password').type(password);
    cy.contains('button', 'Login').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    cy.contains(testUser.name, { timeout: 10000 }).should('be.visible');
  });
});
