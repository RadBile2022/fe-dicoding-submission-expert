import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import CategoryFilter from './CategoryFilter';

/*
Skenario komponen CategoryFilter:
1. Komponen harus menampilkan tombol Semua dan seluruh kategori.
2. Ketika kategori dipilih, onSelect harus menerima nama kategori tersebut.
*/

describe('CategoryFilter component', () => {
  it('should render categories and call onSelect with selected category', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="all"
        onSelect={onSelect}
      />,
    );

    expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument();
    const reactButton = screen.getByRole('button', { name: '#react' });

    await user.click(reactButton);
    expect(onSelect).toHaveBeenCalledWith('react');
  });
});
