import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
export const Footer = styled.div`
  display: flex;
  justify-content: right;
  gap: 16px;
`;
export const SubmitBtn = styled.button`
  background-color: #ffa800;
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: -16px;
  left: 22px;
  font-size: 12px;
  color: #ff2d55;
`;
