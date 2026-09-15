/*
Skenario pengujian End-to-End alur login:
1. Login dengan kredensial tidak valid harus tetap berada di halaman login dan menampilkan error.
2. Login dengan kredensial valid harus berhasil menuju halaman utama dan menampilkan nama pengguna.
3. Seluruh request login dimock agar pengujian stabil dan independen dari API eksternal.
*/

describe('Login flow', () => {
  const password = 'testing123';
  const testUser = {
    id: 'user-e2e-1',
    name: 'Discussly E2E User',
    email: 'discussly-e2e@example.com',
    password,
  };

  it('should show an error when credentials are invalid', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'fail',
        message: 'Email atau password salah',
      },
    }).as('loginFailed');

    cy.visit('/login');
    cy.get('#login-email').type('wrong@example.com');
    cy.get('#login-password').type('wrong-password');
    cy.contains('button', 'Login').click();

    cy.wait('@loginFailed');
    cy.location('pathname').should('eq', '/login');
    cy.get('.alert--error').should('be.visible');
  });

  it('should login successfully using valid credentials', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          token: 'fake-access-token',
        },
      },
    }).as('loginSuccess');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          user: {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
          },
        },
      },
    }).as('getOwnProfile');

    cy.visit('/login');

    cy.get('#login-email').type(testUser.email);
    cy.get('#login-password').type(password);
    cy.contains('button', 'Login').click();

    cy.wait('@loginSuccess');
    cy.wait('@getOwnProfile');
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    cy.contains(testUser.name, { timeout: 10000 }).should('be.visible');
  });
});
