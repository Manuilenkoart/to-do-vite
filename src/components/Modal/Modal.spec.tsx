import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import Modal from './Modal';

const defaultProps = {
  isShow: true,
  onClose: vi.fn(),
};

type OverrideProps = Partial<Parameters<typeof Modal>[0]>;

const renderComponent = (overrideProps?: OverrideProps, options?: RenderOptions) => ({
  user: userEvent.setup(),
  ...render(
    <Modal {...defaultProps} {...overrideProps}>
      <p>Modal Content</p>,
    </Modal>,
    options
  ),
});

describe('<Modal />', () => {
  it('renders children correctly', () => {
    renderComponent();

    expect(defaultProps.isShow).toBeTruthy();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });
  it('hasn`t rendered', () => {
    renderComponent({ isShow: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('handleBackdropClick', () => {
    it('hasn`t closed the modal ', async () => {
      const { user } = renderComponent();

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByText(/modal content/i));

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
    it('has closed the modal', async () => {
      const { user } = renderComponent();
      const modal = screen.getByRole('dialog');

      await user.click(modal.parentElement as HTMLElement);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
