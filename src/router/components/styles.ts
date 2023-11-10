import { FrownOutlined, MehOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 15%;
`;
export const Container = styled.div`
  display: flex;
`;

export const FrownOutlinedWrapper = styled(FrownOutlined)`
  font-size: 100px;
`;
export const MehOutlinedWrapper = styled(MehOutlined)`
  font-size: 100px;
`;

export const WrapperNavLink = styled(NavLink)`
  padding: 8px 16px;
  border: 1px solid #747bff;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 0 16px 16px rgba(100, 108, 255, 0.18);
    transition: box-shadow 200ms linear;
  }
`;

export const H1Wrapper = styled.h1`
  font-size: 100px;
  margin: 0;
`;
