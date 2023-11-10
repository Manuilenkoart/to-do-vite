import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  height: 28px;
  display: flex;
  padding: 16px;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 20px 29px -14px;
`;

export const WrapperNavLink = styled(NavLink)`
  display: flex;
  align-items: end;
  color: #213547;
`;

export const Logo = styled.img`
  width: 28px;
`;
export const WrapperH1 = styled.h1`
  font-size: 16px;
`;
