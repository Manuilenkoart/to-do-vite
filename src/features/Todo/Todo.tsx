import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Todo } from '@/api';
import { Loader } from '@/components';
import { Modal, useModalHandlers } from '@/components/Modal';
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
} from '@/store';

import { EmptyTodoList, TodoForm, TodoList } from './components';
import * as S from './Todo.styled';

function TodoPage() {
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
      <S.Section>
        <S.LogoWrapper>
          {todoStatus === 'pending' && !todosTotalCount ? <Loader /> : <S.Logo src={viteLogo} alt="Vite logo" />}
        </S.LogoWrapper>

        <S.AddBtnWrapper>
          <S.AddBtn type="button" disabled={!!todoError} onClick={handleAddTodoClick}>
            Add todo
          </S.AddBtn>
        </S.AddBtnWrapper>

        <TodoList
          todos={todos}
          todoCurrentIds={todoCurrentIds}
          emptyView={<EmptyTodoList />}
          onUpdateClick={handleUpdateTodoClick}
          onDeleteClick={handleDeleteTodoClick}
        />
      </S.Section>

      <Modal isShow={isTodoModalOpen} onClose={handleCancelModalClick}>
        <TodoForm initialValues={initialFormTodo} onSubmit={handleSubmitFormTodo} onCancel={handleCancelModalClick} />
      </Modal>
    </>
  );
}

export default TodoPage;
