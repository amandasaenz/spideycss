import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../themes/Themes';

interface NavProps extends Theme {
  children: React.ReactNode;
}

const Navbar: React.FC<NavProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Glass {...props} />
      {children}
    </Container>
  );
};

export default Navbar;

const Glass = styled.div<Theme>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.glass};
  backdrop-filter: blur(4px);
  z-index: -1;
`;

const Container = styled.div<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
  z-index: 1;
  justify-content: center;
`;
