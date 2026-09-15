import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import VoteButton from './VoteButton';

/*
Skenario pengujian komponen VoteButton:
1. Harus menampilkan jumlah vote dan accessible name yang sesuai.
2. Harus menampilkan status aktif melalui aria-pressed dan class aktif.
3. Ketika tombol diklik, callback onClick harus dipanggil satu kali.
*/

describe('VoteButton component', () => {
  it('should render vote count and accessible name', () => {
    render(
      <VoteButton
        type="up"
        count={7}
        active={false}
        onClick={() => {}}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Up-vote, 7 vote',
    });

    expect(button).toHaveTextContent('7');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('should render active state correctly', () => {
    render(
      <VoteButton
        type="down"
        count={3}
        active
        onClick={() => {}}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Down-vote, 3 vote',
    });

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveClass('vote-button--active');
  });

  it('should call onClick once when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <VoteButton
        type="up"
        count={1}
        active={false}
        onClick={onClick}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: 'Up-vote, 1 vote' }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
