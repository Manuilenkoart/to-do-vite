import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, vi } from 'vitest';

import { generateStringLength } from '@/test';
import { initialTodo, todo } from '@/test/__mock__';

import { FormSchemaErrorMessage } from './FormSchema';
import TodoForm from './TodoForm';

const defaultProps = {
  initialValues: initialTodo,
  onCancel: vi.fn(),
  onSubmit: vi.fn(),
};
type OverrideProps = Partial<Parameters<typeof TodoForm>[0]>;

const renderTodoForm = (overrideProps?: OverrideProps, options?: RenderOptions) => {
  const user = userEvent.setup();
  const renderResult = render(<TodoForm {...defaultProps} {...overrideProps} />, options);

  const titleInput = screen.getByLabelText(/title/i);
  const textInput = screen.getByLabelText(/description/i);

  const allButtons = screen.getAllByRole('button');
  const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

  return {
    user,
    titleInput,
    textInput,
    submitButton,
    ...renderResult,
  };
};

describe('<TodoForm />', () => {
  it('renders correctly', () => {
    renderTodoForm();

    const title = screen.getByRole('heading');
    const inputs = screen.getAllByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(inputs).toHaveLength(2);
    expect(buttons).toHaveLength(2);
  });

  describe('Title', () => {
    it('has Add todo for new', () => {
      renderTodoForm();

      const titleAddTodo = screen.getByText(/add todo/i);
      const titleUpdateTodo = screen.queryByText(/update todo/i);

      expect(titleAddTodo).toBeInTheDocument();
      expect(titleUpdateTodo).not.toBeInTheDocument();
    });

    it('has Update todo title for update current', () => {
      renderTodoForm({ initialValues: todo });

      const titleUpdateTodo = screen.getByText(/update todo/i);
      const titleAddTodo = screen.queryByText(/add todo/i);

      expect(titleUpdateTodo).toBeInTheDocument();
      expect(titleAddTodo).not.toBeInTheDocument();
    });
  });

  describe('Submit button', () => {
    it('has Add name', () => {
      renderTodoForm();
      const btnAdd = screen.getByRole('button', { name: /add/i });
      const btnUpdate = screen.queryByRole('button', { name: /update/i });

      expect(btnAdd).toBeInTheDocument();
      expect(btnAdd).toHaveAttribute('type', 'submit');
      expect(btnUpdate).not.toBeInTheDocument();
    });

    it('has Update name', () => {
      renderTodoForm({ initialValues: todo });
      const btnUpdate = screen.getByRole('button', { name: /update/i });
      const btnAdd = screen.queryByRole('button', { name: /add/i });

      expect(btnUpdate).toBeInTheDocument();
      expect(btnUpdate).toHaveAttribute('type', 'submit');
      expect(btnAdd).not.toBeInTheDocument();
    });
  });

  describe('Title input validation', () => {
    it('has required', async () => {
      const { user, submitButton } = renderTodoForm();

      if (submitButton) await user.click(submitButton);

      const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.title.min);
      expect(errorMessageMinLength).toBeInTheDocument();
    });

    it('has valid input', async () => {
      const { user, submitButton, titleInput } = renderTodoForm();

      await user.type(titleInput, generateStringLength(5));

      if (submitButton) await user.click(submitButton);

      const errorMessageMinLength = screen.queryByText(FormSchemaErrorMessage.title.min);
      const errorMessageMaxLength = screen.queryByText(FormSchemaErrorMessage.title.max);

      expect(errorMessageMinLength).not.toBeInTheDocument();
      expect(errorMessageMaxLength).not.toBeInTheDocument();
    });

    it('has error input enter 15 symbols', async () => {
      const { user, submitButton, titleInput } = renderTodoForm();

      await user.type(titleInput, generateStringLength(15));

      if (submitButton) await user.click(submitButton);

      const errorMessageMaxLength = await screen.findByText(FormSchemaErrorMessage.title.max);
      expect(errorMessageMaxLength).toBeInTheDocument();
    });
  });
  describe('Text input validation', async () => {
    it('has required', async () => {
      const { user, submitButton } = renderTodoForm();

      if (submitButton) await user.click(submitButton);

      const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.text.min);
      expect(errorMessageMinLength).toBeInTheDocument();
    });

    it('has valid input ', async () => {
      const { user, submitButton, textInput } = renderTodoForm();

      await user.type(textInput, generateStringLength(75));

      if (submitButton) await user.click(submitButton);

      const errorMessageMinLength = screen.queryByText(FormSchemaErrorMessage.text.min);
      const errorMessageMaxLength = screen.queryByText(FormSchemaErrorMessage.text.max);

      expect(errorMessageMinLength).not.toBeInTheDocument();
      expect(errorMessageMaxLength).not.toBeInTheDocument();
    });

    it('has error input enter 101 symbol', async () => {
      const { user, submitButton, textInput } = renderTodoForm();

      await user.type(textInput, generateStringLength(101));

      if (submitButton) await user.click(submitButton);

      const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.text.max);
      expect(errorMessageMinLength).toBeInTheDocument();
    });
  });

  describe('TodoForm submitting', () => {
    it('has Created new todo', async () => {
      const updatedTodo = {
        id: '',
        title: 'myTitle',
        text: 'myText',
      };
      const { user, submitButton, titleInput, textInput } = renderTodoForm({ initialValues: initialTodo });

      await user.type(titleInput, updatedTodo.title);
      await user.type(textInput, updatedTodo.text);

      if (submitButton) await user.click(submitButton);

      expect(defaultProps.onSubmit).toHaveBeenCalledWith(updatedTodo);
    });

    it('has Updated todo', async () => {
      const updatedValues = {
        id: '1',
        title: 'myTitleUpdated',
        text: 'myTextUpdated',
      };
      const { user, submitButton, titleInput, textInput } = renderTodoForm({ initialValues: todo });

      user.clear(titleInput);
      user.clear(textInput);

      await user.type(titleInput, updatedValues.title);
      await user.type(textInput, updatedValues.text);

      if (submitButton) await user.click(submitButton);

      expect(defaultProps.onSubmit).toHaveBeenCalledWith(updatedValues);
    });
  });
});
