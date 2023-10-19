import { ArrowUpOutlined } from '@ant-design/icons';

import * as S from './EmptyTodoList.style';

function EmptyTodoList() {
  return (
    <div>
      <S.WrapperIcons>
        <ArrowUpOutlined />
        <ArrowUpOutlined />
        <ArrowUpOutlined />
      </S.WrapperIcons>

      <h4>Does not have any todo</h4>
    </div>
  );
}

export default EmptyTodoList;
