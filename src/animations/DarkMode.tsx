import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { useSpring, animated, SpringValue } from 'react-spring';
import ThemeContext from '../themes/ThemeContext';

const DarkMode: React.FC = () => {
  const { dark, toggleDark, theme } = useContext(ThemeContext);

  const SunScale = useSpring<SpringValue>({
    r: dark === true ? 3 : 8,
  });

  const ClipScale = useSpring<SpringValue>({
    r: dark === true ? 4 : 9,
  });

  const MoonScale = useSpring<SpringValue>({
    r: dark === true ? 0 : 8,
  });

  const MaskScale = useSpring<SpringValue>({
    r: dark === true ? 0 : 7,
  });

  const SunRotate = useSpring<SpringValue>({
    transformOrigin: 'center',
    transform: dark ? 'rotate(45deg)' : 'rotate(0deg)',
  });

  const RayAnim = useSpring<SpringValue>({
    height: dark ? 4 : 0,
    width: 2,
  });

  return (
    <Button onClick={toggleDark}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24px'
        height='24px'
      >
        <animated.g style={SunRotate} clipPath='url(#clip)' mask='url(#mask)'>
          <animated.circle
            style={SunScale}
            cx='12'
            cy='12'
            stroke={theme.accent}
            strokeWidth='2'
            fill='transparent'
          />

          <animated.circle
            style={MoonScale}
            cx='19'
            cy='7'
            stroke={theme.accent}
            strokeWidth='2'
            fill='transparent'
          />

          <mask id='mask'>
            <rect x='0' y='0' width='100%' height='100%' fill='white' />
            <animated.circle cx='19' cy='7' style={MaskScale} fill='black' />
          </mask>

          <mask id='maskRays'>
            <rect x='0' y='0' width='100%' height='100%' fill='white' />
            <animated.circle style={SunScale} cx='12' cy='12' fill='black' />
          </mask>

          <clipPath id='clip'>
            <animated.circle cx='12' cy='12' style={ClipScale} />
          </clipPath>
        </animated.g>

        <animated.g mask='url(#maskRays)'>
          <animated.rect
            x='-13'
            y='-6'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(-180)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='-13'
            y='18'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(-90)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='11'
            y='18'
            style={RayAnim}
            fill={theme.accent}
            rx={1}
            ry={1}
          />

          <animated.rect
            x='11'
            y='-6'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(90)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='-18'
            y='6'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(-135)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='-1'
            y='23'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(-45)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='16'
            y='6'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(45)'
            rx={1}
            ry={1}
          />

          <animated.rect
            x='-1'
            y='-11'
            style={RayAnim}
            fill={theme.accent}
            transform='rotate(135)'
            rx={1}
            ry={1}
          />
        </animated.g>
      </svg>
    </Button>
  );
};

export default DarkMode;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  cursor: pointer;
`;
