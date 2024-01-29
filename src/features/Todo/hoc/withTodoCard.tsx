import { useMutation } from '@apollo/client';
import { ComponentType, useCallback } from 'react';

import { deleteTodo, Todo, updateTodo } from '@/api';
import { Mutation } from '@/api/graphql/types/graphql';
import { Modal } from '@/components';
import { useModalHandlers } from '@/components/Modal';

import { TodoForm } from '../components/TodoForm';

interface withTodoCardProps {
  todo: Todo;
}

function withTodoCard<T>(WrappedComponent: ComponentType<T>) {
  return function WithTodoCard(props: withTodoCardProps) {
    const { todo } = props;

    const [updateTodoMutation, { loading: isUpdateTodoMutation }] = useMutation<Mutation>(updateTodo);

    const [deleteTodoMutation, { loading: isDeleteTodoMutation }] = useMutation<Mutation>(deleteTodo, {
      update(cache, { data }) {
        const deletedTodo = data?.deleteTodo;
        if (!deletedTodo) return;

        cache.modify({
          fields: {
            todos(cachedTodo) {
              return cachedTodo.filter(({ __ref }: { __ref: string }) => __ref !== `Todo:${deletedTodo.id}`);
            },
          },
        });
      },
    });

    const {
      isModalOpen: isTodoModalOpen,
      handleModalClose: handleTodoModalClose,
      handleModalOpen: handleTodoModalOpen,
    } = useModalHandlers();

    const handleSubmitFormTodo = useCallback(
      (updatedTodo: Todo) => {
        updateTodoMutation({ variables: updatedTodo });
        handleTodoModalClose();
      },
      [updateTodoMutation, handleTodoModalClose]
    );

    const handleDeleteTodoClick = useCallback(
      (id: Todo['id']) => {
        deleteTodoMutation({ variables: { id } });
      },
      [deleteTodoMutation]
    );

    return (
      <>
        <WrappedComponent
          {...(props as T & withTodoCardProps)}
          isLoading={isUpdateTodoMutation || isDeleteTodoMutation}
          onUpdateClick={handleTodoModalOpen}
          onDeleteClick={handleDeleteTodoClick}
        />
        <Modal isShow={isTodoModalOpen} onClose={handleTodoModalClose}>
          <TodoForm initialValues={todo} onSubmit={handleSubmitFormTodo} onCancel={handleTodoModalClose} />
        </Modal>
      </>
    );
  };
}

export default withTodoCard;
