import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Theme } from '../themes/Themes';

interface SelectProps extends Theme {
  clicked?: boolean;
}

const Radio: React.FC<Theme> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledRadio {...props} onClick={() => setOpen(!open)}>
      <Select {...props} clicked={open} />
    </StyledRadio>
  );
};

export default Radio;

const StyledRadio = styled.div<Theme>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 2px ${(p) => p.theme.secondary} solid;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.div<SelectProps>`
  width: 16px;
  height: 16px;
  border: 2px ${(p) => p.theme.secondary} solid;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: ${(p) => p.clicked && p.theme.secondary};
`;
