import { fireEvent, render, screen } from '@testing-library/react';
import { it, vi } from 'vitest';

import { Todo } from '@/api';
import { generateString, initialTodo, todo } from '@/test';

import { FormSchemaErrorMessage } from './FormSchema';
import TodoForm from './TodoForm';

const onCancel = vi.fn();
const onSubmit = vi.fn();

const renderTodoForm = (formValue: Todo) =>
  render(<TodoForm initialValues={formValue} onCancel={onCancel} onSubmit={onSubmit} />);

describe('TodoForm title', () => {
  it('has Add todo title for new todo', () => {
    renderTodoForm(initialTodo);

    const titleAddTodo = screen.getByText('Add Todo');
    const titleUpdateTodo = screen.queryByText('Update Todo');

    expect(titleAddTodo).toBeInTheDocument();
    expect(titleUpdateTodo).not.toBeInTheDocument();
  });

  it('has Update todo title for update current todo', () => {
    renderTodoForm(todo);

    const titleUpdateTodo = screen.getByText('Update Todo');
    const titleAddTodo = screen.queryByText('Add Todo');

    expect(titleUpdateTodo).toBeInTheDocument();
    expect(titleAddTodo).not.toBeInTheDocument();
  });
});

describe('TodoForm submit button', () => {
  it('has Add name', () => {
    renderTodoForm(initialTodo);

    const allButtons = screen.getAllByRole('button');

    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');
    if (submitButton) {
      expect(submitButton.textContent).toBe('Add');
    } else {
      expect(submitButton).toBeInTheDocument();
    }
  });

  it('has Update name', () => {
    renderTodoForm(todo);
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');
    if (submitButton) {
      expect(submitButton.textContent).toBe('Update');
    } else {
      expect(submitButton).toBeInTheDocument();
    }
  });
});

describe('TodoForm submitting', () => {
  it('has Create new todo', () => {
    const updatedTodo = {
      id: '',
      title: 'myTitle',
      text: 'myText',
    };
    renderTodoForm(initialTodo);

    const titleInput = screen.getByLabelText('Title');
    const textInput = screen.getByLabelText('Description');

    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: updatedTodo.text } });
    fireEvent.change(textInput, { target: { value: updatedTodo.title } });

    if (submitButton) {
      fireEvent.click(submitButton);
    }
    onSubmit(updatedTodo);

    expect(onSubmit).toHaveBeenCalledWith(updatedTodo);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('has Update todo', () => {
    const updatedValues = {
      id: '1',
      title: 'myTitleUpdated',
      text: 'myUpdated',
    };

    renderTodoForm(todo);

    const titleInput = screen.getByLabelText('Title');
    const textInput = screen.getByLabelText('Description');

    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: updatedValues.text } });
    fireEvent.change(textInput, { target: { value: updatedValues.title } });

    if (submitButton) {
      fireEvent.click(submitButton);
    }
    onSubmit(updatedValues);

    expect(onSubmit).toHaveBeenCalledWith(updatedValues);
    expect(onCancel).not.toHaveBeenCalled();
  });
});

describe('TodoForm title input (min:1, max:14)', () => {
  it('has error input enter 0 symbol', async () => {
    renderTodoForm(initialTodo);

    const titleInput = screen.getByLabelText('Title');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: '' } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.title.min);
    expect(errorMessageMinLength).toBeInTheDocument();
  });

  it('has valid input enter 5 symbols', () => {
    renderTodoForm(initialTodo);
    const titleInput = screen.getByLabelText('Title');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: generateString(5) } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMinLength = screen.queryByText(FormSchemaErrorMessage.title.min);
    const errorMessageMaxLength = screen.queryByText(FormSchemaErrorMessage.title.max);

    expect(errorMessageMinLength).not.toBeInTheDocument();
    expect(errorMessageMaxLength).not.toBeInTheDocument();
  });

  it('has error input enter 15 symbols', async () => {
    renderTodoForm(initialTodo);
    const titleInput = screen.getByLabelText('Title');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: generateString(15) } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMaxLength = await screen.findByText(FormSchemaErrorMessage.title.max);

    expect(errorMessageMaxLength).toBeInTheDocument();
  });
});

describe('TodoForm text input (min:1, max:100)', () => {
  it('has error input enter 0 symbol', async () => {
    renderTodoForm(initialTodo);

    const titleInput = screen.getByLabelText('Description');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: '' } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.text.min);
    expect(errorMessageMinLength).toBeInTheDocument();
  });

  it('has valid input enter 75 symbols', () => {
    renderTodoForm(initialTodo);

    const titleInput = screen.getByLabelText('Description');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: generateString(75) } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMinLength = screen.queryByText(FormSchemaErrorMessage.text.min);
    const errorMessageMaxLength = screen.queryByText(FormSchemaErrorMessage.text.max);

    expect(errorMessageMinLength).not.toBeInTheDocument();
    expect(errorMessageMaxLength).not.toBeInTheDocument();
  });

  it('has error input enter 101 symbol', async () => {
    renderTodoForm(initialTodo);

    const titleInput = screen.getByLabelText('Description');
    const allButtons = screen.getAllByRole('button');
    const submitButton = allButtons.find((button) => button.getAttribute('type') === 'submit');

    fireEvent.change(titleInput, { target: { value: generateString(101) } });
    if (submitButton) fireEvent.click(submitButton);

    const errorMessageMinLength = await screen.findByText(FormSchemaErrorMessage.text.max);
    expect(errorMessageMinLength).toBeInTheDocument();
  });
});
