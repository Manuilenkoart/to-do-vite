import logo from '@assets/logo.png';

import * as S from './Header.styles';

function Header() {
  return (
    <S.Container>
      <S.Logo src={logo} alt="logo" />
      <S.WrapperH1>Just todo it</S.WrapperH1>
    </S.Container>
  );
}

export default Header;
