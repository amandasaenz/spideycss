import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ThemeMode } from '../themes/Themes';
import Typography from './Typography';
import Button from './Button';

interface Props {
  theme: ThemeMode;
}

const Calendar: React.FC<Props> = ({ theme, ...props }) => {
  const display = new Date();
  const [month, setMonth] = useState<number>(display.getMonth());
  const [year, setYear] = useState<number>(display.getFullYear());

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const GridItem = (month: number, day: number, color: string) => {
    return (
      <Item theme={theme} style={{ backgroundColor: color }}>
        <div
          style={
            `${month} ${day}, ${year}` ===
            `${currentMonth} ${currentDay}, ${currentYear}`
              ? {
                  backgroundColor: theme.secondary,
                  padding: '4px',
                  boxSizing: 'border-box',
                  width: '24px',
                  textAlign: 'center',
                }
              : {
                  padding: '4px',
                  boxSizing: 'border-box',
                  width: '24px',
                  textAlign: 'center',
                }
          }
        >
          <Typography
            theme={theme}
            variant='h7'
            color={
              `${month} ${day}, ${year}` ===
              `${currentMonth} ${currentDay}, ${currentYear}`
                ? theme.background
                : theme.secondary
            }
          >
            {day}
          </Typography>
        </div>
      </Item>
    );
  };

  const listGridItems = (month: number, year: number, theme: ThemeMode) => {
    const firstWeekday = new Date(`${monthNames[month]} 1, ${year}`).getDay(); // first weekday (Sun 0 - Sat 6) of current month
    const previousLength = new Date(year, month, 0).getDate(); // previous month length
    const currentLength = new Date(year, month + 1, 0).getDate(); // current month length

    const weekRemainder = 7 - (7 - firstWeekday); // remainder of days in first week of current month
    const prevDaysIndex = previousLength - weekRemainder; // start index of previous month
    const nextDaysLength = 42 - (weekRemainder + currentLength); // length of next month

    const listPrevious = monthDays.map((day, index) => {
      return (
        index < previousLength &&
        index >= prevDaysIndex && (
          <React.Fragment key={index}>
            {GridItem(month - 1, day, theme.glass)}
          </React.Fragment>
        )
      );
    });

    const ListCurrent = monthDays.map((day, index) => {
      return (
        index < currentLength && (
          <React.Fragment key={index}>
            {GridItem(month, day, theme.background)}
          </React.Fragment>
        )
      );
    });

    const listNext = monthDays.map((day, index) => {
      return (
        index < nextDaysLength && (
          <React.Fragment key={index}>
            {GridItem(month + 1, day, theme.glass)}
          </React.Fragment>
        )
      );
    });

    return (
      <>
        {listPrevious}
        {ListCurrent}
        {listNext}
      </>
    );
  };

  const Heading = () => {
    const ListWeekDays = weekdays.map((day, i) => (
      <Typography key={i} theme={theme} variant='h7'>
        {day}
      </Typography>
    ));

    return (
      <StyledHeading theme={theme}>
        <Display theme={theme}>
          <Button
            onClick={() => {
              setMonth(month === 0 ? 11 : month - 1);
              setYear(month === 0 ? year - 1 : year);
            }}
            theme={theme}
            icon='left'
            i_color={theme.secondary}
          />
          <Typography theme={theme} variant='h6'>
            {monthNames[month] + ' '}
            {year}
          </Typography>
          <Button
            onClick={() => {
              setMonth(month === 11 ? 0 : month + 1);
              setYear(month === 11 ? year + 1 : year);
            }}
            theme={theme}
            icon='right'
            i_color={theme.secondary}
          />
        </Display>
        <DisplayWeekDays theme={theme}>{ListWeekDays}</DisplayWeekDays>
      </StyledHeading>
    );
  };

  return (
    <Container theme={theme} {...props}>
      <Heading {...props} />
      <CalendarContainer theme={theme}>
        <Grid theme={theme} {...props}>
          {listGridItems(month, year, theme)}
        </Grid>
      </CalendarContainer>
    </Container>
  );
};

export default Calendar;

const Container = styled.div<Props>``;

const StyledHeading = styled.div<Props>`
  background-color: ${(p) => p.theme.background};
  border: 2px ${(p) => p.theme.secondary} solid;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  width: 100%;
`;

const Display = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const DisplayWeekDays = styled.div<Props>`
  display: flex;
  justify-content: space-around;
  padding-top: 8px;
  padding-bottom: 8px;
  box-sizing: border-box;
  height: 44px;
  align-items: center;
`;
const CalendarContainer = styled.div<Props>`
  border-left: 2px ${(p) => p.theme.secondary} solid;
  border-right: 2px ${(p) => p.theme.secondary} solid;
  border-bottom: 2px ${(p) => p.theme.secondary} solid;
  border-radius: 0 0 4px 4px;
  background-color: ${(p) => p.theme.secondary};
`;

const Grid = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
`;

const Item = styled.div<Props>`
  height: 50px;

  @media screen and (max-width: 450px) {
    height: 40px;
  }
`;
