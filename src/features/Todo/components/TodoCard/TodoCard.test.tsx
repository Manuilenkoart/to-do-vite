import { fireEvent, render, screen } from '@testing-library/react';
import { it, vi } from 'vitest';

import { todo } from '../../__mock__';
import TodoCard from './TodoCard';

const onUpdateClick = vi.fn();
const onDeleteClick = vi.fn();

const renderTodoCard = ({ isLoading = false }: { isLoading?: boolean }) =>
  render(<TodoCard isLoading={isLoading} todo={todo} onUpdateClick={onUpdateClick} onDeleteClick={onDeleteClick} />);

describe('TodoCard', () => {
  it('has loading indicator when isLoading is true', () => {
    renderTodoCard({ isLoading: true });

    const loader = screen.getByTestId('line-loader');

    expect(loader).toBeInTheDocument();
  });

  it('hasn`t loading indicator when isLoading is false', () => {
    renderTodoCard({});

    const loader = screen.queryByTestId('line-loader');

    expect(loader).toBeNull();
  });

  it('has todo title and text', () => {
    renderTodoCard({});

    const title = screen.getByRole('heading', { name: todo.title, level: 3 });
    const text = screen.getByText(todo.text);

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('calls onUpdateClick when Edit icon is clicked', () => {
    renderTodoCard({});

    const allImg = screen.getAllByRole('img');
    const deleteIcon = allImg.find((img) => img.getAttribute('aria-label') === 'edit');

    if (deleteIcon) fireEvent.click(deleteIcon);

    expect(onUpdateClick).toHaveBeenCalledWith({ ...todo });
  });

  it('calls onDeleteClick when Delete icon is clicked', () => {
    renderTodoCard({});

    const allImg = screen.getAllByRole('img');
    const deleteIcon = allImg.find((img) => img.getAttribute('aria-label') === 'delete');

    if (deleteIcon) fireEvent.click(deleteIcon);

    expect(onDeleteClick).toHaveBeenCalledWith(todo.id);
  });
});
