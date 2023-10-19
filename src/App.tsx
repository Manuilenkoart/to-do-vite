import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Todo } from './api';
import * as S from './App.style';
import { EmptyTodoList, Loader, Modal, TodoForm, TodoList } from './components';
import { useModalHandlers } from './components/Modal';
import {
  addTodoFetch,
  deleteTodoFetch,
  getTodosFetch,
  selectAllTodo,
  selectTodoCurrentIds,
  selectTodoError,
  selectTodoStatus,
  selectTotalTodo,
  updateTodoFetch,
  useAppDispatch,
  useAppSelector,
} from './store';

function App() {
  const dispatch = useAppDispatch();
  const todosTotalCount = useAppSelector(selectTotalTodo);
  const todoStatus = useAppSelector(selectTodoStatus);
  const todoError = useAppSelector(selectTodoError);
  const todos = useAppSelector(selectAllTodo);
  const todoCurrentIds = useAppSelector(selectTodoCurrentIds);

  const initialTodo = { id: '', title: '', text: '' } as const;
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
    },
    [dispatch, handleTodoModalClose]
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
  }, [handleTodoModalClose]);

  const handleAddTodoClick = () => {
    setInitialFormTodo(initialTodo);
    handleTodoModalOpen();
  };

  return (
    <>
      <S.Container>
        {todoStatus === 'pending' && !todosTotalCount ? <Loader /> : <S.Logo src={viteLogo} alt="Vite logo" />}

        <div>
          <S.AddBtn type="button" onClick={handleAddTodoClick}>
            Add todo
          </S.AddBtn>
        </div>

        {todosTotalCount ? (
          <TodoList
            todos={todos}
            todoCurrentIds={todoCurrentIds}
            onUpdateClick={handleUpdateTodoClick}
            onDeleteClick={handleDeleteTodoClick}
          />
        ) : (
          todoStatus === 'fulfilled' && <EmptyTodoList />
        )}
      </S.Container>
      {isTodoModalOpen && (
        <Modal>
          <TodoForm
            initialValues={initialFormTodo}
            onHandleSubmit={handleSubmitFormTodo}
            onCancel={handleCancelModalClick}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
