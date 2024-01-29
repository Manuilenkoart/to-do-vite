import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it } from 'vitest';

import { todo } from '@/test/__mock__';

import { EmptyTodoList } from '../EmptyTodoList';
import TodoList from './TodoList';

type DefaultProps = Parameters<typeof TodoList>[0];
type OverrideProps = Partial<DefaultProps>;

const defaultProps: DefaultProps = {
  todos: [],
  emptyView: <EmptyTodoList />,
};

const renderComponent = (overrideProps?: OverrideProps, options?: RenderOptions) => {
  const user = userEvent.setup();
  const renderResult = render(<TodoList {...defaultProps} {...overrideProps} />, options);
  return {
    user,
    ...renderResult,
  };
};

describe('<TodoList />', () => {
  describe('renders correctly', () => {
    it('hasn`t any todo ', () => {
      renderComponent();
      const emptyView = screen.getByText(/does not have any todo/i);

      expect(emptyView).toBeInTheDocument();
      expect(defaultProps.todos).toHaveLength(0);
    });

    it('has todo', () => {
      renderComponent({ todos: [todo] });

      defaultProps.todos.forEach(({ title, text }) => {
        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();
      });

      expect(screen.queryByText(/does not have any todo/i)).not.toBeInTheDocument();
    });
  });

  describe('props for <TodoCard />', () => {
    it('has isLoading condition true', () => {
      const overrideProps = {
        todos: [todo],
        todoCurrentIds: [todo.id],
      };
      renderComponent(overrideProps);

      overrideProps.todos.forEach(({ id }) => {
        const isLoading = overrideProps.todoCurrentIds.includes(id);
        expect(isLoading).toBeTruthy();
      });
    });
  });
});
