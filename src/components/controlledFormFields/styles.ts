import styled from 'styled-components';

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: -16px;
  left: 16px;
  font-size: 12px;
  color: #ff2d55;
`;

export const Label = styled.label`
  padding: 0 0 4px 12px;
`;
