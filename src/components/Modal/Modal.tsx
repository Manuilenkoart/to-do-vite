import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import * as S from './Modal.styled';

function Modal({ children }: PropsWithChildren) {
  return createPortal(<S.Wrapper>{children}</S.Wrapper>, document.body);
}

export default Modal;
