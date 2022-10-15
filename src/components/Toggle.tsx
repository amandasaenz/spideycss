import styled from '@emotion/styled';
import React, { useState } from 'react';
import { animated, config, SpringValue, useSpring } from 'react-spring';
import { Theme } from '../themes/Themes';

interface ToggleProps extends Theme {}

const Toggle: React.FC<ToggleProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const slide = useSpring<SpringValue>({
    marginLeft: open ? 16 : 0,
    config: config.default,
  });

  return (
    <StyledToggle {...props} onClick={() => setOpen(!open)}>
      <Knob {...props} style={{ ...slide }} />
    </StyledToggle>
  );
};

export default Toggle;

const StyledToggle = styled.div<Theme>`
  width: 48px;
  height: 32px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 2px ${(p) => p.theme.secondary} solid;
  display: flex;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none;
`;

const Knob = styled(animated.div)<Theme>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.secondary};
`;
