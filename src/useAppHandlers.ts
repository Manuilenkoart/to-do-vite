import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Todo, TodoState } from './api';
import { useModalHandlers } from './components/Modal';
import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch, useAppDispatch, useAppSelector } from './store';

export interface AppHandlers {
  initialFormTodo: Todo;
  todoState: TodoState;
  modal: {
    isTodoModalOpen: boolean;
    handleTodoModalOpen: () => void;
  };
  handleSubmitFormTodo: (todo: Todo) => void;
  handleUpdateTodoClick: (todo: Todo) => void;
  handleDeleteTodoClick: (id: Todo['id']) => void;
  handleCancelModalClick: () => void;
}

function useAppHandlers(): AppHandlers {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoState);

  const initialFormValuesTodo = { id: '', title: '', text: '' } as Todo;
  const [initialFormTodo, setInitialFormTodo] = useState<Todo>(initialFormValuesTodo);

  useEffect(() => {
    dispatch(getTodosFetch());
  }, [dispatch]);

  useEffect(() => {
    if (todoState.error) {
      toast.error(todoState.error);
    }
  }, [todoState.error]);

  const {
    isModalOpen: isTodoModalOpen,
    handleModalClose: handleTodoModalClose,
    handleModalOpen: handleTodoModalOpen,
  } = useModalHandlers();

  const handleSubmitFormTodo = (todo: Todo): void => {
    const { id, ...todoFields } = todo;
    if (id) {
      dispatch(updateTodoFetch({ id, ...todoFields }));
    } else {
      dispatch(addTodoFetch(todoFields));
    }

    handleTodoModalClose();
    setInitialFormTodo(initialFormValuesTodo);
  };

  const handleUpdateTodoClick = (todo: Todo): void => {
    setInitialFormTodo((prev) => ({ ...prev, ...todo }));
    handleTodoModalOpen();
  };

  const handleDeleteTodoClick = (id: Todo['id']): void => {
    dispatch(deleteTodoFetch(id));
  };

  const handleCancelModalClick = (): void => {
    handleTodoModalClose();
    setInitialFormTodo(initialFormValuesTodo);
  };

  return {
    todoState,
    initialFormTodo,
    modal: {
      isTodoModalOpen,
      handleTodoModalOpen,
    },
    handleSubmitFormTodo,
    handleUpdateTodoClick,
    handleDeleteTodoClick,
    handleCancelModalClick,
  };
}

export default useAppHandlers;
