import { useRouteError } from 'react-router-dom';

import { ROUTER_PATH } from '@/router';

import * as S from '../styles';

function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <S.Wrapper>
      <S.Container>
        <S.FrownOutlinedWrapper />
        <S.H1Wrapper>oops</S.H1Wrapper>
      </S.Container>

      <h3> {error.message}</h3>

      <S.WrapperNavLink to={ROUTER_PATH.root} replace>
        Go to home page
      </S.WrapperNavLink>
    </S.Wrapper>
  );
}

export default ErrorBoundary;
