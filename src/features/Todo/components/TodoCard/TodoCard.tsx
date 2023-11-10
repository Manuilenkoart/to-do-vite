import { memo } from 'react';

import { Todo } from '@/api';
import { LineLoader } from '@/components';

import * as S from './TodoCard.styles';

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
          <S.EditIcon onClick={() => onUpdateClick({ id, title, text })} />
          <S.DeleteIcon onClick={() => onDeleteClick(id)} />
        </S.IconsContainer>
      </S.Header>
      <S.Body>{text}</S.Body>
    </S.Card>
  );
}

export default memo(TodoCard);
