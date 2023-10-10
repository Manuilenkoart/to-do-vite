import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

import * as S from './Modal.style';

interface ModalProps {
  children: ReactElement;
}

function Modal({ children }: ModalProps): ReactElement {
  return createPortal(<S.Wrapper>{children}</S.Wrapper>, document.body);
}

export default Modal;
