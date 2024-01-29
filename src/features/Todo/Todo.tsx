import { useMutation, useQuery } from '@apollo/client';
import viteLogo from '@assets/vite.svg';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { createTodo, Todo, todosQuery } from '@/api';
import { Mutation, Query } from '@/api/graphql/types/graphql';
import { Loader } from '@/components';
import { Modal, useModalHandlers } from '@/components/Modal';

import { EmptyTodoList, TodoForm, TodoList } from './components';
import * as S from './Todo.styled';

function TodoPage() {
  const initialFormTodo = { id: '', title: '', text: '' } as const;

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
      createTodoMutation({
        variables: {
          ...todo,
        },
      });

      handleTodoModalClose();
    },
    [handleTodoModalClose, createTodoMutation]
  );

  return (
    <>
      <S.Section>
        <S.LogoWrapper>
          {isTodosLoading || isLoadingCreateTodo ? <Loader /> : <S.Logo src={viteLogo} alt="Vite logo" />}
        </S.LogoWrapper>

        <S.AddBtnWrapper>
          <S.AddBtn type="button" disabled={!!getTodosError} onClick={handleTodoModalOpen}>
            Add todo
          </S.AddBtn>
        </S.AddBtnWrapper>

        <TodoList todos={todos} emptyView={<EmptyTodoList />} />
      </S.Section>

      <Modal isShow={isTodoModalOpen} onClose={handleTodoModalClose}>
        <TodoForm initialValues={initialFormTodo} onSubmit={handleSubmitFormTodo} onCancel={handleTodoModalClose} />
      </Modal>
    </>
  );
}

export default TodoPage;
