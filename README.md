# Discussly Forum — React Web Developer Expert Submission

Aplikasi forum diskusi React + Redux Toolkit menggunakan Dicoding Forum API.
Versi ini mempertahankan submission sebelumnya dan menambahkan automation testing, CI/CD, serta React ecosystem.

## Fitur utama

- Register dan login
- Daftar dan detail thread
- Membuat thread dan komentar
- Vote thread dan komentar dengan optimistic update
- Leaderboard
- Filter berdasarkan kategori
- Loading indicator
- Atomic Design (`atoms`, `molecules`, `organisms`, `templates`)
- ESLint Airbnb + React Strict Mode

## Automation Testing

Pengujian yang disediakan:

- Reducer: minimal 2 skenario pada `threadsSlice.reducer.test.js`
- Thunk: `asyncReceiveThreads` dan `asyncLoginUser`
- React Components: `VoteButton` dan `CategoryFilter`
- End-to-End: alur login melalui Cypress

Setiap berkas test memiliki skenario pengujian di bagian atas file.

Jalankan:

```bash
npm install
npm run lint
npm test
```

Untuk E2E cukup jalankan satu perintah. Script akan menyalakan Vite, menunggu aplikasi siap, menjalankan Cypress, lalu menghentikan server:

```bash
npm run e2e
```

## React Ecosystem

Submission menggunakan **React Hook Form** pada halaman Login dan Register untuk pengelolaan serta validasi form. React Hook Form tercantum pada daftar `awesome-react-ecosystem` milik Dicoding.

## CI/CD

Continuous Integration tersedia di:

```text
.github/workflows/ci.yml
```

Workflow berjalan pada pull request/push ke `master` dan menjalankan:

1. `npm install`
2. `npm run lint`
3. `npm test`
4. `npm run build`

Continuous Deployment dilakukan dengan menghubungkan repository GitHub ke Vercel. `vercel.json` disediakan agar route SPA tetap dapat dibuka langsung.

## Screenshot wajib

Masukkan bukti asli ke folder `screenshot/` dengan nama:

```text
1_ci_check_error.png
2_ci_check_pass.png
3_branch_protection.png
```

Screenshot tidak dapat dibuat dari source code karena harus menjadi bukti kondisi GitHub/Vercel yang benar-benar terjadi.

## Catatan submission

Tambahkan URL deployment Vercel pada catatan submission Dicoding.
Hapus `node_modules` dan `dist` sebelum membuat ZIP final.

## Automation Testing Coverage

Submission versi ini sengaja memiliki lebih dari minimum kriteria agar tidak ambigu saat direview:

- Reducer: 4 test case pada `threadsSlice.reducer.test.js`.
- Thunk: 4 test case total, mencakup success dan failure pada `asyncReceiveThreads` dan `asyncLoginUser`.
- React Components: 7 test case total pada `VoteButton` dan `CategoryFilter`.
- End-to-End: 2 skenario login, yaitu invalid credentials dan successful login.
- Setiap berkas pengujian memiliki komentar skenario pengujian di bagian atas file.
