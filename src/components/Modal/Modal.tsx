import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 250px;
  top: 25%;
  left: calc(50% - 125px);
  padding: 16px 32px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
`;

interface ModalProps {
  children: ReactElement;
}

function Modal({ children }: ModalProps): ReactElement {
  return createPortal(<Wrapper>{children}</Wrapper>, document.body);
}

export default Modal;
