/*
Skenario pengujian End-to-End alur login:
1. Login dengan kredensial tidak valid harus tetap berada di halaman login dan menampilkan error.
2. Login dengan kredensial valid harus berhasil menuju halaman utama dan menampilkan nama pengguna.
3. Akun valid dibuat terlebih dahulu melalui Dicoding Forum API agar
   pengujian dapat diulang secara independen.
*/

describe('Login flow', () => {
  const testUser = {
    id: 'user-discussly-e2e',
    name: 'Discussly E2E User',
    email: 'discussly-e2e@example.com',
    password: 'testing123',
    avatar: 'https://ui-avatars.com/api/?name=Discussly+E2E+User',
  };

  it('should show an error when credentials are invalid', () => {
    cy.intercept('POST', '**/v1/login', {
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
    cy.intercept('POST', '**/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          token: 'mock-access-token',
        },
      },
    }).as('loginSuccess');
    cy.intercept('GET', '**/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          user: testUser,
        },
      },
    }).as('getOwnProfile');
    cy.intercept('GET', '**/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          threads: [],
        },
      },
    }).as('getThreads');
    cy.intercept('GET', '**/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          users: [],
        },
      },
    }).as('getUsers');

    cy.visit('/login');

    cy.get('#login-email').type(testUser.email);
    cy.get('#login-password').type(testUser.password);
    cy.contains('button', 'Login').click();

    cy.wait('@loginSuccess');
    cy.wait('@getOwnProfile');
    cy.wait('@getThreads');
    cy.wait('@getUsers');
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    cy.contains(testUser.name, { timeout: 10000 }).should('be.visible');
  });
});
