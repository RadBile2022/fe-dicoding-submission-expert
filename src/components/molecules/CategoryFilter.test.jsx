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
Skenario pengujian komponen CategoryFilter:
1. Harus menampilkan tombol Semua dan seluruh kategori yang diberikan.
2. Kategori yang sedang dipilih harus memiliki class chip--active.
3. Ketika kategori dipilih, onSelect harus menerima nama kategori tersebut.
4. Ketika tombol Semua dipilih, onSelect harus menerima nilai all.
*/

describe('CategoryFilter component', () => {
  it('should render all category buttons', () => {
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="all"
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#redux' })).toBeInTheDocument();
  });

  it('should mark selected category as active', () => {
    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="redux"
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: '#redux' })).toHaveClass(
      'chip--active',
    );
    expect(screen.getByRole('button', { name: '#react' })).not.toHaveClass(
      'chip--active',
    );
  });

  it('should call onSelect with selected category', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="all"
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '#react' }));

    expect(onSelect).toHaveBeenCalledWith('react');
  });

  it('should call onSelect with all when Semua is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory="react"
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Semua' }));

    expect(onSelect).toHaveBeenCalledWith('all');
  });
});
