import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, SpringValue, config } from 'react-spring';
import styled from '@emotion/styled';
import { Theme } from '../themes/Themes';
import Icon from './Icon';

interface SelectProps extends Theme {
  children: JSX.Element[];
  tag?: string | JSX.Element;
  value?: string;
  width?: number;
}

interface OptionProps extends Theme {
  value?: string;
  active?: boolean;
}

// THINGS TO DO: get outside click to work properly

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  const [open, isOpen] = useState(false);
  const [text, setText] = useState(children[0].props.children);
  const ref = useRef<HTMLDivElement>(null);

  // if user clicks outside of Navbar it will close
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && ref.current.contains(event.target as HTMLDivElement))
        return;

      isOpen(false);
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleClickOutside);
    document.addEventListener('popstate', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
      document.removeEventListener('popstate', handleClickOutside);
    };
  }, [ref, isOpen]);

  const rotate = useSpring<SpringValue>({
    transformOrigin: 'center',
    transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
  });

  const blinds = useSpring<SpringValue>({
    height: open ? children.length * 44 : 0,
    config: config.default,
  });

  return (
    <Container ref={ref} {...props}>
      <Sticky {...props} onClick={() => isOpen(!open)}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {`${text}`}
          {props.tag}
        </div>
        <StyledIcon {...props} id='arrow' style={{ ...rotate }} />
      </Sticky>
      <Options {...props} style={{ ...blinds }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            active: child.props.value === props.value,
            theme: props.theme,
            onClick: () => {
              child.props.onClick();
              setText(child.props.children);
              isOpen(!open);
            },
          });
        })}
      </Options>
    </Container>
  );
};

export default Select;

const Container = styled.div<SelectProps>`
  font-family: 'Montserrat', sans-serif;
  color: ${(p) => p.theme.primary};
  background-color: ${(p) => p.theme.background};
  border: solid 2px ${(p) => p.theme.secondary};
  width: ${(p) => p.width}px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledIcon = styled(animated(Icon))<Theme>`
  fill: ${(p) => p.theme.accent};
`;

export const Option = styled.div<OptionProps>`
  padding: 10px 16px;
  text-align: left;
  &:hover {
    background-color: ${(p) => p.theme.hover};
  }
  background-color: ${(p) => p.active && p.theme.hover};
`;

const Options = styled(animated.div)<Theme>`
  display: grid;
  overflow: auto;
  color: ${(p) => p.theme.primary};
`;

const Sticky = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
`;
