import { MouseEvent, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';

import * as S from './Modal.styled';

interface ModalProps extends PropsWithChildren {
  isShow: boolean;
  onClose: () => void;
}

function Modal({ isShow, onClose, children }: ModalProps) {
  const backdropRef = useRef(null);

  const handleEscapeKey = useCallback(({ key }: KeyboardEvent) => (key === 'Escape' ? onClose() : null), [onClose]);

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const handleBackdropClick = ({ target }: MouseEvent) => {
    if (backdropRef.current && target !== backdropRef.current) {
      return;
    }
    onClose();
  };

  return (
    isShow &&
    createPortal(
      <S.Backdrop ref={backdropRef} onClick={handleBackdropClick}>
        <S.Section role="dialog">
          <FocusLock autoFocus={false}>{children}</FocusLock>
        </S.Section>
      </S.Backdrop>,
      document.body
    )
  );
}

export default Modal;
