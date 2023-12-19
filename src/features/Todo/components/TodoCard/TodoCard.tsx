import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { memo } from 'react';

import { Todo } from '@/api';
import { LineLoader } from '@/components';

import * as S from './TodoCard.styled';

interface TodoCardProps {
  isLoading: boolean;
  todo: Todo;
  onUpdateClick: (todo: Todo) => void;
  onDeleteClick: (id: Todo['id']) => void;
}
function TodoCard({ isLoading, todo: { id, text, title }, onDeleteClick, onUpdateClick }: TodoCardProps) {
  return (
    <S.Card>
      {isLoading && (
        <S.WrapperLineLoader>
          <LineLoader />
        </S.WrapperLineLoader>
      )}
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.IconsContainer>
          <S.EditButton onClick={() => onUpdateClick({ id, title, text })} data-testid="TodoCard-edit-btn">
            <EditOutlined />
          </S.EditButton>
          <S.DeleteButton onClick={() => onDeleteClick(id)} data-testid="TodoCard-delete-btn">
            <DeleteOutlined />
          </S.DeleteButton>
        </S.IconsContainer>
      </S.Header>
      <S.Body>{text}</S.Body>
    </S.Card>
  );
}

export default memo(TodoCard);
