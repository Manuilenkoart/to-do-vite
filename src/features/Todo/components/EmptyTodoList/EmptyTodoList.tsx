import { ArrowUpOutlined } from '@ant-design/icons';

import * as S from './EmptyTodoList.styled';

function EmptyTodoList() {
  return (
    <S.Container>
      <S.WrapperIcons>
        <ArrowUpOutlined />
        <ArrowUpOutlined />
        <ArrowUpOutlined />
      </S.WrapperIcons>

      <h3>Does not have any todo</h3>
    </S.Container>
  );
}

export default EmptyTodoList;
