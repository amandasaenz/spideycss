import React from 'react';
import styled from '@emotion/styled';
import { animated, useTrail } from 'react-spring';
import { Theme, ThemeMode } from '../themes/Themes';

interface ITrail extends Theme {
  trigger?: number;
}

interface RectProps extends Theme {
  index: number;
}

const ThemeSwatch: React.FC<ITrail> = ({ ...props }) => {
  const trail = useTrail(3, {
    from: {
      height: props.trigger ? '0%' : '100%',
    },
    to: {
      height: '100%',
    },
    reset: true,
    config: { mass: 1, tension: 250, friction: 20 },
  });

  const h = [getRandomInt(8, 18), getRandomInt(8, 18), getRandomInt(8, 18)];

  return (
    <Container {...props}>
      {trail.map((style, index) => (
        <div
          key={index}
          style={{
            height: props.trigger ? getRandomHeight(index) : `${h}px`,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Rect {...props} style={style} index={index} />
        </div>
      ))}
    </Container>
  );
};

export default ThemeSwatch;

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomHeight = (i: number) => {
  if (i == null) {
    return i;
  }

  switch (i) {
    case 0:
      return getRandomInt(8, 18);
    case 1:
      return getRandomInt(8, 18);
    case 2:
      return getRandomInt(8, 18);
    default:
      return getRandomInt(8, 18);
  }
};

const calculateColor = (i?: number, theme?: ThemeMode) => {
  if (i == null) {
    return i;
  }

  switch (i) {
    case 0:
      return theme?.accent;
    case 1:
      return theme?.secondary;
    case 2:
      return theme?.primary;
    default:
      return theme?.primary;
  }
};

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;
`;

const Rect = styled(animated.div)<RectProps>`
  border-radius: 4px 4px 2px 2px;
  width: 4px;
  height: 8px;
  background-color: ${(p) => calculateColor(p.index, p.theme)};
`;
