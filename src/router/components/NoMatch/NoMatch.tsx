import ROUTER_PATH from '@/router/routerPath';

import { AnimatedFace } from '../animatedFace';
import * as S from '../styles';

function NoMatch() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.H1Wrapper>4</S.H1Wrapper>
        <AnimatedFace />
        <S.H1Wrapper>4</S.H1Wrapper>
      </S.Container>

      <h3> Not found</h3>

      <S.WrapperNavLink to={ROUTER_PATH.root} replace>
        Go to home page
      </S.WrapperNavLink>
    </S.Wrapper>
  );
}

export default NoMatch;
