import React, {memo} from 'react';

import LogoTypo from '@assets/images/logo/logo-typo';
import RFontSize from '@utils/RFontSize';

import {Container, Brand, Settings} from './styles';

interface HeaderProps {
  /**
   * @default true
   */
  settings?: boolean;
}

const Header: React.FC<HeaderProps> = ({settings = true}) => (
  <Container>
    <Brand>
      <LogoTypo width={RFontSize(160)} height={RFontSize(32)} />
    </Brand>
    {settings && <Settings />}
  </Container>
);

export default memo(Header);
