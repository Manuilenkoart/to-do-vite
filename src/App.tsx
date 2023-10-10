import viteLogo from '@assets/vite.svg';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Todo } from './api';
import { Loader, Modal, TodoForm, TodoList } from './components';
import { useModalHandlers } from './components/Modal';
import { addTodoFetch, deleteTodoFetch, getTodosFetch, updateTodoFetch, useAppDispatch, useAppSelector } from './store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const AddBtn = styled.button`
  background-color: #ffa800;
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

function App() {
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

  const handleUpdateTodoClick = (todo: Todo) => {
    setInitialFormTodo((prev) => ({ ...prev, ...todo }));
    handleTodoModalOpen();
  };

  const handleDeleteTodoClick = (id: Todo['id']) => {
    dispatch(deleteTodoFetch(id));
  };

  const handleCancelModalClick = () => {
    handleTodoModalClose();
    setInitialFormTodo(initialFormValuesTodo);
  };

  return (
    <>
      <Container>
        {todoState.status === 'pending' ? <Loader /> : <Logo src={viteLogo} alt="Vite logo" />}

        <div>
          <AddBtn type="button" onClick={handleTodoModalOpen}>
            Add Todo
          </AddBtn>
        </div>

        <TodoList todoState={todoState} onUpdateClick={handleUpdateTodoClick} onDeleteClick={handleDeleteTodoClick} />
      </Container>
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
