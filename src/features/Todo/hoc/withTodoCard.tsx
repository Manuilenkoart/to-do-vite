import { ComponentType, useCallback } from 'react';

import { Todo } from '@/api';
import { Modal } from '@/components';
import { useModalHandlers } from '@/components/Modal';

import { TodoForm } from '../components/TodoForm';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../hooks/todoSchema.generatedTypes';

interface withTodoCardProps {
  todo: Todo;
}

function withTodoCard<T>(WrappedComponent: ComponentType<T>) {
  return function WithTodoCard(props: withTodoCardProps) {
    const { todo } = props;

    const [updateTodoMutation, { loading: isUpdateTodoMutation }] = useUpdateTodoMutation();

    const [deleteTodoMutation, { loading: isDeleteTodoMutation }] = useDeleteTodoMutation({
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
