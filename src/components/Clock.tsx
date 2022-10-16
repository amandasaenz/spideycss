import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { animated, SpringValue, useSpring } from 'react-spring';
import { Theme } from '../themes/Themes';

interface ClockProps extends Theme {
  size?: number;
  circle?: boolean;
}

const InnerClock: React.FC<ClockProps> = ({ size, theme }) => {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());
  const [milli, setMilli] = useState(new Date().getSeconds() / 10);

  useEffect(() => {
    const time = setInterval(() => {
      setMilli(new Date().getSeconds() / 10);
      setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  });

  const secondsAnim = useSpring<SpringValue>({
    loop: true,

    from: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: seconds * 6,
    },
    to: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: seconds * 6,
    },
  });

  const minutesAnim = useSpring<SpringValue>({
    loop: true,

    from: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: minutes * 6 + milli,
    },
    to: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: minutes * 6 + milli,
    },
  });

  const hoursAnim = useSpring<SpringValue>({
    loop: true,

    from: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: hours * 30 + minutes / 2,
    },
    to: {
      transform: `translateY(${calculatePercentage(-12)}%)`,
      rotate: hours * 30 + minutes / 2,
    },
  });

  return (
    <>
      <HourHand style={hoursAnim} theme={theme} size={size} />
      <MinuteHand style={minutesAnim} theme={theme} size={size} />
      <SecondHand style={secondsAnim} theme={theme} size={size} />
      <Center size={size} theme={theme} />

      <KnotchContainer size={size}>
        <Knotch size={size} theme={theme} />
        <Knotch size={size} theme={theme} />
      </KnotchContainer>
      <KnotchContainer style={{ transform: 'rotate(90deg)' }} size={size}>
        <Knotch size={size} theme={theme} />
        <Knotch size={size} theme={theme} />
      </KnotchContainer>
      <KnotchContainer size={size} style={{ transform: 'rotate(30deg)' }}>
        <CircleKotch size={size} theme={theme} />
        <CircleKotch size={size} theme={theme} />
      </KnotchContainer>
      <KnotchContainer size={size} style={{ transform: 'rotate(60deg)' }}>
        <CircleKotch size={size} theme={theme} />
        <CircleKotch size={size} theme={theme} />
      </KnotchContainer>
      <KnotchContainer style={{ transform: 'rotate(120deg)' }} size={size}>
        <CircleKotch size={size} theme={theme} />
        <CircleKotch size={size} theme={theme} />
      </KnotchContainer>
      <KnotchContainer style={{ transform: 'rotate(150deg)' }} size={size}>
        <CircleKotch size={size} theme={theme} />
        <CircleKotch size={size} theme={theme} />
      </KnotchContainer>
    </>
  );
};

const Clocks: React.FC<ClockProps> = ({ ...props }) => {
  const size = props.size !== undefined ? props.size : 24;

  return (
    <StyledClock {...props} size={size}>
      {props.circle ? (
        <Circle {...props} size={size} theme={props.theme}>
          <InnerClock size={size} theme={props.theme} />
        </Circle>
      ) : (
        <Square {...props} size={size} theme={props.theme}>
          <InnerClock size={size} theme={props.theme} />
        </Square>
      )}
    </StyledClock>
  );
};

export default Clocks;

const calculatePercentage = (size: number) => {
  const percentage = 100 / 24; //using a 24px grid in percentages
  return percentage * size;
};

const StyledClock = styled.div<ClockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => (p.size! ? p.size : 24)}px;
  height: ${(p) => (p.size! ? p.size : 24)}px;
  box-sizing: border-box;
`;

const Circle = styled.div<ClockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${calculatePercentage(20)}%;
  height: ${calculatePercentage(20)}%;
  border: ${(p) =>
    p.size! < 50
      ? `1px solid ${p.theme.secondary}`
      : `2px solid ${p.theme.secondary}`};
  border-radius: 100%;
  box-sizing: border-box;
`;

const Square = styled.div<ClockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${calculatePercentage(18)}%;
  height: ${calculatePercentage(18)}%;
  border: ${(p) =>
    p.size! < 50
      ? `1px solid ${p.theme.secondary}`
      : `2px solid ${p.theme.secondary}`};
  border-radius: ${calculatePercentage(18) / 4}%;
  box-sizing: border-box;
`;

const Center = styled.div<ClockProps>`
  width: ${(p) => (p.size! > 50 ? 4 : 1)}px;
  height: ${(p) => (p.size! > 50 ? 4 : 1)}px;
  background-color: ${(p) => p.theme.secondary};
  border-radius: 100%;
  position: absolute;
  margin: 0 auto;
`;

const HourHand = styled(animated.div)<ClockProps>`
  width: ${(p) => (p.size! < 50 ? 1 : 2)}px;
  height: ${calculatePercentage(4)}%;
  border-radius: 2px;
  background-color: ${(p) => p.theme.secondary};
  transform-origin: bottom;
  position: absolute;
`;

const MinuteHand = styled(animated.div)<ClockProps>`
  width: ${(p) => (p.size! < 50 ? 0.5 : 1)}px;
  height: ${calculatePercentage(6)}%;
  border-radius: 1px;
  background-color: ${(p) => p.theme.secondary};
  transform-origin: bottom;
  position: absolute;
`;

const SecondHand = styled(animated.div)<ClockProps>`
  width: ${(p) => (p.size! < 50 ? 0.25 : 1)}px;
  height: ${calculatePercentage(8)}%;
  border-radius: 2px;
  background-color: ${(p) => p.theme.secondary};
  transform-origin: bottom;
  position: absolute;
`;

const KnotchContainer = styled.div<ClockProps>`
  height: 100%;
  padding: ${calculatePercentage(1)}%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
`;

const Knotch = styled.div<ClockProps>`
  width: ${(p) => (p.size! > 50 ? 4 : 1)}px;
  height: ${(p) => (p.size! > 50 ? 8 : 2)}px;
  background-color: ${(p) => p.theme.secondary};
  border-radius: 4px;
`;

const CircleKotch = styled.div<ClockProps>`
  width: ${(p) => (p.size! > 50 ? 4 : 1)}px;
  height: ${(p) => (p.size! > 50 ? 4 : 1)}px;
  background-color: ${(p) => p.theme.secondary};
  border-radius: 100%;
`;
