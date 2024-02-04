import { useMutation } from '@apollo/client';
import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '@/api';
import { Loader } from '@/components';
import { Modal, useModalHandlers } from '@/components/Modal';

import { EmptyTodoList, TodoForm, TodoList } from './components';
import { todosQuery, updateTodo } from './graphql';
import {
  TodosQueryQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useTodosQueryQuery,
} from './hooks/todoSchema.generatedTypes';
import * as S from './Todo.styled';

function TodoPage() {
  const [loadingIds, setLoadingIds] = useState<Todo['id'][]>([]);

  const { data: { todos = [] } = {}, loading: isTodosLoading, error: getTodosError } = useTodosQueryQuery();

  const [createTodoMutation, { error: createTodoError, loading: isLoadingCreateTodo }] = useCreateTodoMutation({
    update(cache, { data }) {
      const createdTodo = data?.createTodo;
      if (!createdTodo) return;

      const { todos: todosCached = [] } = cache.readQuery<TodosQueryQuery>({ query: todosQuery }) ?? {};

      cache.writeQuery({
        query: todosQuery,
        data: {
          todos: [...todosCached, createdTodo],
        },
      });
    },
  });

  const [updateTodoMutation, { error: updateTodoError }] = useMutation(updateTodo, {
    onCompleted(data) {
      setLoadingIds((prev) => [...prev.filter((id) => id !== data.updateTodo.id)]);
    },
  });

  const [deleteTodoMutation, { error: deleteTodoError }] = useDeleteTodoMutation({
    update(cache, { data }) {
      const deletedTodo = data?.deleteTodo;
      if (!deletedTodo) return;
      setLoadingIds((prev) => [...prev.filter((id) => id !== deletedTodo.id)]);
      cache.modify({
        fields: {
          todos(cachedTodo) {
            return cachedTodo.filter(({ __ref }: { __ref: string }) => __ref !== `Todo:${deletedTodo.id}`);
          },
        },
      });
    },
  });

  const initialTodo = { id: '', title: '', text: '' } as const;
  const [initialFormTodo, setInitialFormTodo] = useState<Todo>(initialTodo);

  useEffect(() => {
    const hasError = getTodosError || createTodoError || deleteTodoError || updateTodoError;
    const errorMessage =
      getTodosError?.message || createTodoError?.message || deleteTodoError?.message || updateTodoError?.message;

    if (hasError) {
      toast.error(errorMessage);
    }
  }, [getTodosError, createTodoError, deleteTodoError, updateTodoError]);

  const {
    isModalOpen: isTodoModalOpen,
    handleModalClose: handleTodoModalClose,
    handleModalOpen: handleTodoModalOpen,
  } = useModalHandlers();

  const handleSubmitFormTodo = useCallback(
    (todo: Todo) => {
      const { id, ...todoFields } = todo;
      if (id) {
        setLoadingIds((prev) => [...prev, id]);
        updateTodoMutation({
          variables: { id, ...todoFields },
          optimisticResponse: { updateTodo: { __typename: 'Todo', id, ...todoFields } },
        });
      } else {
        createTodoMutation({
          variables: {
            ...todoFields,
          },
          optimisticResponse: { createTodo: { __typename: 'Todo', id: uuidv4(), ...todoFields } },
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
    (todo: Todo) => {
      setLoadingIds((prev) => [...prev, todo.id]);
      deleteTodoMutation({
        variables: { id: todo.id },
        optimisticResponse: { deleteTodo: { __typename: 'Todo', ...todo } },
      });
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
          todoCurrentIds={loadingIds}
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
