import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring, animated, SpringValue, config } from 'react-spring';
import styled from '@emotion/styled';
import { Theme } from '../themes/Themes';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';

interface SelectProps extends Theme {
  children: JSX.Element[];
  arrow?: JSX.Element;
  value?: string;
  width?: number;
}

interface OptionProps extends Theme, LinkProps {
  value?: string;
  active?: boolean;
}

const CustomSelect: React.FC<SelectProps> = ({ children, ...props }) => {
  const [searchParams] = useSearchParams();
  const [open, isOpen] = useState(false);
  const [text, setText] = useState<string>(
    calculateText(searchParams.get('theme')!)
  );

  const matchLocation = useCallback(() => {
    return setText(calculateText(searchParams.get('theme')!));
  }, [searchParams]);

  useEffect(() => {
    matchLocation();
  }, [matchLocation]);

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

  const blinds = useSpring<SpringValue>({
    height: open ? children.length * 44 : 0,
    config: config.default,
  });

  return (
    <Container ref={ref} {...props}>
      <Sticky {...props} onClick={() => isOpen(!open)}>
        {`${text}`}
        {props.arrow}
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

export default CustomSelect;

const calculateText = (theme: string) => {
  if (theme == null) {
    return 'Neon';
  }

  switch (theme) {
    case 'neon':
      return 'Neon';
    case 'boba':
      return 'Boba Tea';
    case 'earth':
      return 'Earth';
    case 'kirby':
      return 'Kirby';
    case 'retro':
      return 'Retro';
    case 'playstation':
      return 'Playstation';
    default:
      return 'Neon';
  }
};

const Container = styled.div<SelectProps>`
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05rem;
  color: ${(p) => p.theme.primary};
  background-color: ${(p) => p.theme.background};
  border: solid 2px ${(p) => p.theme.secondary};
  width: ${(p) => p.width}px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;

  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none;
`;

export const Option = styled(Link)<OptionProps>`
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
