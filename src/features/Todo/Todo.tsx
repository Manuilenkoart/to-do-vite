import { useMutation, useQuery } from '@apollo/client';
import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { createTodo, deleteTodo, Todo, todosQuery, updateTodo } from '@/api';
import { Mutation, Query } from '@/api/graphql/types/graphql';
import { Loader } from '@/components';
import { Modal, useModalHandlers } from '@/components/Modal';

import { EmptyTodoList, TodoForm, TodoList } from './components';
import * as S from './Todo.styled';

function TodoPage() {
  const [loadingIds, setLoadingIds] = useState<Todo['id'][]>([]);

  const { data: { todos = [] } = {}, loading: isTodosLoading, error: getTodosError } = useQuery<Query>(todosQuery);

  const [createTodoMutation, { error: createTodoError, loading: isLoadingCreateTodo }] = useMutation<Mutation>(
    createTodo,
    {
      update(cache, { data }) {
        const createdTodo = data?.createTodo;
        if (!createdTodo) return;

        const { todos: todosCached = [] } = cache.readQuery<Query>({ query: todosQuery }) ?? {};

        cache.writeQuery({
          query: todosQuery,
          data: {
            todos: [...todosCached, createdTodo],
          },
        });
      },
    }
  );

  const [updateTodoMutation] = useMutation<Mutation>(updateTodo, {
    onCompleted(data) {
      setLoadingIds((prev) => [...prev.filter((id) => id !== data.updateTodo.id)]);
    },
  });

  const [deleteTodoMutation] = useMutation<Mutation>(deleteTodo, {
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
        setLoadingIds((prev) => [...prev, id]);
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
      setLoadingIds((prev) => [...prev, id]);
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
