import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Modal from './Modal';

describe('<Modal />', () => {
  it('renders children correctly', () => {
    render(
      <Modal>
        <div>children</div>
      </Modal>
    );
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
});
