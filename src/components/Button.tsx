import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '../themes/Themes';
import Icon from './Icon';
import Typography from './Typography';

interface ButtonProps extends Theme {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode | undefined;
  variant?: 'outline';
  icon?: string;
  i_color?: string;
  text?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {props.icon && <Icon color={props.i_color} {...props} id={props.icon} />}
      {children && <Typography>{children}</Typography>}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.div<ButtonProps>`
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05rem;
  color: ${(p) => p.theme.primary};
  border: ${(p) => p.variant === 'outline' && `2px ${p.theme.secondary} solid`};
  font-size: 16px;
  line-height: 24px;
  ${(p) => (p.children ? 'padding: 10px 10px' : 'padding: 10px 16px')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none;
`;
