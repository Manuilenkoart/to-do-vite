import { useMutation, useQuery } from '@apollo/client';
import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CREATE_TODO, DELETE_TODO, GET_TODOS, Todo, UPDATE_TODO } from '@/api';
import { Loader } from '@/components';
import { Modal, useModalHandlers } from '@/components/Modal';

import { EmptyTodoList, TodoForm, TodoList } from './components';
import * as S from './Todo.styled';

function TodoPage() {
  const {
    data: { todos = [] } = {},
    loading: isTodosLoading,
    error: getTodosError,
  } = useQuery<{ todos: Todo[] }>(GET_TODOS);

  const [createTodoMutation, { error: createTodoError, loading: isLoadingCreateTodo }] = useMutation(CREATE_TODO, {
    update(cache, { data: { createTodo: createdTodo } }) {
      const { todos: todosCached = [] } = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS }) ?? {};

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: [...todosCached, createdTodo],
        },
      });
    },
  });
  const [updateTodoMutation] = useMutation(UPDATE_TODO, {});
  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    update(cache, { data: { deleteTodo: deletedTodo } }) {
      cache.modify({
        fields: {
          todos(cachedTodo = []) {
            return cachedTodo.filter(({ __ref }: { __ref: string }) => __ref !== `Todo:${deletedTodo.id}`);
          },
        },
      });
    },
  });

  const initialTodo = { id: '', title: '', text: '' } as const;
  const [initialFormTodo, setInitialFormTodo] = useState<Todo>(initialTodo);

  useEffect(() => {
    if (getTodosError || createTodoError) {
      toast.error(getTodosError?.message || createTodoError?.message);
    }
  }, [getTodosError, createTodoError]);

  const {
    isModalOpen: isTodoModalOpen,
    handleModalClose: handleTodoModalClose,
    handleModalOpen: handleTodoModalOpen,
  } = useModalHandlers();

  const handleSubmitFormTodo = useCallback(
    (todo: Todo) => {
      const { id, ...todoFields } = todo;
      if (id) {
        updateTodoMutation({ variables: { id, ...todoFields } });
      } else {
        createTodoMutation({
          variables: {
            ...todoFields,
          },
        });
      }

      handleTodoModalClose();
    },
    [handleTodoModalClose, updateTodoMutation, createTodoMutation]
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
      deleteTodoMutation({ variables: { id } });
    },
    [deleteTodoMutation]
  );

  const handleAddTodoClick = () => {
    setInitialFormTodo(initialTodo);
    handleTodoModalOpen();
  };
  return (
    <>
      <S.Section>
        <S.LogoWrapper>
          {isTodosLoading || isLoadingCreateTodo ? <Loader /> : <S.Logo src={viteLogo} alt="Vite logo" />}
        </S.LogoWrapper>

        <S.AddBtnWrapper>
          <S.AddBtn type="button" disabled={!!getTodosError} onClick={handleAddTodoClick}>
            Add todo
          </S.AddBtn>
        </S.AddBtnWrapper>

        <TodoList
          todos={todos}
          todoCurrentIds={[]} // TODO: need refactor
          emptyView={<EmptyTodoList />}
          onUpdateClick={handleUpdateTodoClick}
          onDeleteClick={handleDeleteTodoClick}
        />
      </S.Section>

      <Modal isShow={isTodoModalOpen} onClose={handleTodoModalClose}>
        <TodoForm initialValues={initialFormTodo} onSubmit={handleSubmitFormTodo} onCancel={handleTodoModalClose} />
      </Modal>
    </>
  );
}

export default TodoPage;
