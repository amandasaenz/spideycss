import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../themes/Themes';

interface BtnProps extends Theme {
  children: JSX.Element[];
  line?: boolean;
}

const BtnGroup: React.FC<BtnProps> = ({ children, ...props }) => {
  return (
    <StyledBtnGroup {...props}>
      {React.Children.map(children, (child, i) => {
        return (
          <>
            {/* {React.cloneElement(child, {
              style: { border: 'none', padding: 0 },
            })} */}
            {child}
            {props.line && i < children.length - 1 && <Line {...props} />}
          </>
        );
      })}
    </StyledBtnGroup>
  );
};

export default BtnGroup;

const StyledBtnGroup = styled.div<BtnProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
  border: ${(p) => `2px ${p.theme.secondary} solid`};
  cursor: pointer;
`;

const Line = styled.div<Theme>`
  height: 24px;
  min-width: 2px;
  width: 2px;
  background-color: ${(p) => p.theme.secondary};
  border-radius: 4px;
`;
