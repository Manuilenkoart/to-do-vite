import viteLogo from '@assets/vite.svg';
import styled from 'styled-components';

import { Loader, Modal, TodoForm, TodoList } from './components';
import useAppHandlers from './useAppHandlers';

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
  const {
    todoState,
    initialFormTodo,
    modal: { isTodoModalOpen, handleTodoModalOpen },
    handleCancelModalClick,
    handleDeleteTodoClick,
    handleUpdateTodoClick,
    handleSubmitFormTodo,
  } = useAppHandlers();

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
