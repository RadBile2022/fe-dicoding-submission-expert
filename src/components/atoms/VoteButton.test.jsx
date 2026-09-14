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
Skenario komponen VoteButton:
1. Komponen harus menampilkan jumlah vote yang diberikan melalui props.
2. Ketika tombol diklik, callback onClick harus dipanggil satu kali.
*/

describe('VoteButton component', () => {
  it('should render vote count and call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <VoteButton
        type="up"
        count={7}
        active={false}
        onClick={onClick}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'Up-vote, 7 vote',
    });

    expect(button).toHaveTextContent('7');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
