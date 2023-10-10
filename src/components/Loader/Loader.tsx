import reactLogo from '@assets/react.svg';
import { ReactElement } from 'react';

import * as S from './Loader.style';

function Loader(): ReactElement {
  return <S.Logo src={reactLogo} alt="React logo" />;
}

export default Loader;
