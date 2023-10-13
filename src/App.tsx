import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Todo } from './api';
import * as S from './App.style';
import { Loader, Modal, TodoForm, TodoList } from './components';
import { useModalHandlers } from './components/Modal';
import {
  addTodoFetch,
  deleteTodoFetch,
  getTodosFetch,
  todosErrorSelector,
  todosSelector,
  todosStatusSelector,
  updateTodoFetch,
  useAppDispatch,
  useAppSelector,
} from './store';

function App() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todosSelector);
  const todoStatus = useAppSelector(todosStatusSelector);
  const todoError = useAppSelector(todosErrorSelector);

  const initialTodo = useMemo(() => ({ id: '', title: '', text: '' } as const), []);
  const [initialFormTodo, setInitialFormTodo] = useState<Todo>(initialTodo);

  useEffect(() => {
    dispatch(getTodosFetch());
  }, [dispatch]);

  useEffect(() => {
    if (todoError) {
      toast.error(todoError);
    }
  }, [todoError]);

  const {
    isModalOpen: isTodoModalOpen,
    handleModalClose: handleTodoModalClose,
    handleModalOpen: handleTodoModalOpen,
  } = useModalHandlers();

  const handleSubmitFormTodo = useCallback(
    (todo: Todo) => {
      const { id, ...todoFields } = todo;
      if (id) {
        dispatch(updateTodoFetch({ id, ...todoFields }));
      } else {
        dispatch(addTodoFetch(todoFields));
      }

      handleTodoModalClose();
      setInitialFormTodo(initialTodo);
    },
    [dispatch, handleTodoModalClose, initialTodo]
  );

  const handleUpdateTodoClick = useCallback(
    (todo: Todo) => {
      setInitialFormTodo((prev) => ({ ...prev, ...todo }));
      handleTodoModalOpen();
    },
    [handleTodoModalOpen]
  );

  const handleDeleteTodoClick = useCallback(
    (id: Todo['id']) => {
      dispatch(deleteTodoFetch(id));
    },
    [dispatch]
  );

  const handleCancelModalClick = useCallback(() => {
    handleTodoModalClose();
    setInitialFormTodo(initialTodo);
  }, [handleTodoModalClose, initialTodo]);

  return (
    <>
      <S.Container>
        {todoStatus === 'pending' && !todos.length ? <Loader /> : <S.Logo src={viteLogo} alt="Vite logo" />}

        <div>
          <S.AddBtn type="button" onClick={handleTodoModalOpen}>
            Add todo
          </S.AddBtn>
        </div>

        <TodoList onUpdateClick={handleUpdateTodoClick} onDeleteClick={handleDeleteTodoClick} />
      </S.Container>
      {isTodoModalOpen && (
        <Modal>
          <TodoForm
            initialValues={initialFormTodo}
            handleSubmit={handleSubmitFormTodo}
            onCancel={handleCancelModalClick}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
