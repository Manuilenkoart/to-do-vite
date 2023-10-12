import viteLogo from '@assets/vite.svg';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Todo } from './api';
import * as S from './App.style';
import { Loader, Modal, TodoForm, TodoList } from './components';
import { useModalHandlers } from './components/Modal';
import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch, useAppDispatch, useAppSelector } from './store';

function App() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoState);

  const initialTodo = useMemo(() => ({ id: '', title: '', text: '' } as const), []);
  const [initialFormTodo, setInitialFormTodo] = useState<Todo>(initialTodo);
  const [todoPending, setTodoPending] = useState<Todo>(initialTodo);

  useEffect(() => {
    dispatch(getTodosFetch());
  }, [dispatch]);

  useEffect(() => {
    if (todoState.error) {
      toast.error(todoState.error);
    }
    if (todoState.status !== 'pending') {
      setTodoPending(initialTodo);
    }
  }, [todoState.error, todoState.status, initialTodo]);

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
    setInitialFormTodo(initialTodo);
  };

  const handleUpdateTodoClick = (todo: Todo) => {
    setInitialFormTodo((prev) => ({ ...prev, ...todo }));
    setTodoPending(todo);
    handleTodoModalOpen();
  };

  const handleDeleteTodoClick = (id: Todo['id']) => {
    dispatch(deleteTodoFetch(id));
  };

  const handleCancelModalClick = () => {
    handleTodoModalClose();
    setInitialFormTodo(initialTodo);
  };

  return (
    <>
      <S.Container>
        {todoState.status === 'pending' && !todoState.todos.length ? (
          <Loader />
        ) : (
          <S.Logo src={viteLogo} alt="Vite logo" />
        )}

        <div>
          <S.AddBtn type="button" onClick={handleTodoModalOpen}>
            Add Todo
          </S.AddBtn>
        </div>

        <TodoList
          todoState={todoState}
          todoPending={todoPending}
          onUpdateClick={handleUpdateTodoClick}
          onDeleteClick={handleDeleteTodoClick}
        />
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
