import { render, RenderOptions, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { it, vi } from 'vitest';

import { todo } from '../../__mock__';
import TodoCard from './TodoCard';

const defaultProps = {
  isLoading: false,
  todo,
  onUpdateClick: vi.fn(),
  onDeleteClick: vi.fn(),
};
type OverrideProps = Partial<Parameters<typeof TodoCard>[0]>;

const renderComponent = (overrideProps?: OverrideProps, options?: RenderOptions) => {
  const user = userEvent.setup();
  const renderResult = render(<TodoCard {...defaultProps} {...overrideProps} />, options);
  return {
    user,
    ...renderResult,
  };
};

describe('<TodoCard/>', () => {
  it('renders correctly', () => {
    renderComponent();
    const title = screen.getByText(defaultProps.todo.title);
    const text = screen.getByText(defaultProps.todo.text);
    const icons = screen.getAllByRole('img');

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(icons).toHaveLength(2);
  });

  describe('loading indicator', () => {
    it('render', () => {
      renderComponent({ isLoading: true });
      const loader = screen.getByLabelText('line-loader');

      expect(loader).toBeInTheDocument();
    });

    it('don`t render', () => {
      renderComponent();
      const loader = screen.queryByLabelText('line-loader');

      expect(loader).not.toBeInTheDocument();
    });
  });

  it('calls onUpdateClick when Edit icon is clicked', async () => {
    renderComponent();
    const editIcon = screen.getByLabelText(/edit/i);

    await userEvent.click(editIcon);

    expect(defaultProps.onUpdateClick).toHaveBeenCalledWith(defaultProps.todo);
  });

  it('calls onDeleteClick when Delete icon is clicked', async () => {
    renderComponent();
    const deleteIcon = screen.getByLabelText(/delete/i);

    await userEvent.click(deleteIcon);

    expect(defaultProps.onDeleteClick).toHaveBeenCalledWith(defaultProps.todo.id);
  });
});
