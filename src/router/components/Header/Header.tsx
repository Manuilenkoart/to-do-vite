import logo from '@assets/logo.png';

import ROUTER_PATH from '@/router/routerPath';

import * as S from './Header.styled';

function Header() {
  return (
    <S.Container>
      <S.WrapperNavLink to={ROUTER_PATH.root}>
        <S.Logo src={logo} alt="logo" />
        <S.WrapperH1>Just todo it</S.WrapperH1>
      </S.WrapperNavLink>
    </S.Container>
  );
}

export default Header;
