import { useContext, useEffect, useState } from 'react';
import ThemeContext from './themes/ThemeContext';
import { Option } from './components/Select';
import styled from '@emotion/styled';
import Title from './components/Title';
import Icon, { i } from './components/Icon';
import Navbar from './components/Navbar';
import Button from './components/Button';
import BtnGroup from './components/BtnGroup';
import Toggle from './components/Toggle';
import Radio from './components/Radio';
import ThemeSwatch from './animations/ThemeSwatch';
import CustomSelect from './components/CustomSelect';
import DarkMode from './animations/DarkMode';
import Typography from './components/Typography';
import Clock from './components/Clock';
import Code from './components/Code';
import button_txt from './code-snippets/button.txt';
import buttongroup_txt from './code-snippets/buttongroup.txt';
import clock_txt from './code-snippets/clock.txt';
import icon_txt from './code-snippets/icon.txt';
import btngroupicon_txt from './code-snippets/buttongroup-icon.txt';
import toggleselect_txt from './code-snippets/toggle-select.txt';
import title_txt from './code-snippets/title.txt';
import calendar_txt from './code-snippets/calendar.txt';
import Calendar from './components/Calendar';

function App() {
  const options = [
    { value: 'neon', text: 'Neon' },
    { value: 'boba', text: 'Boba Tea' },
    { value: 'earth', text: 'Earth' },
    { value: 'kirby', text: 'Kirby' },
    { value: 'retro', text: 'Retro' },
    { value: 'playstation', text: 'Playstation' },
  ];

  const [isOpened, setOpened] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(true);
  const { selectTheme, selected, theme } = useContext(ThemeContext);
  document.body.style.background = theme.background;
  document.body.style.margin = '0';

  useEffect(() => {
    setTrigger(true);
  }, [theme]);

  return (
    <>
      <Navbar theme={theme}>
        <NavContainer>
          <ButtonIcon
            onClick={() => {
              setOpened(!isOpened);
              setTrigger(false);
            }}
          >
            <Icon id='code' theme={theme} />
          </ButtonIcon>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CustomSelect
              theme={theme}
              width={180}
              value={selected}
              arrow={<ThemeSwatch trigger={trigger ? 1 : 0} theme={theme} />}
            >
              {options.map((option) => (
                <Option
                  onClick={() => {
                    selectTheme?.(option.value);
                  }}
                  key={option.value}
                  value={option.value}
                >
                  {option.text}
                </Option>
              ))}
            </CustomSelect>

            <DarkMode />
          </div>
        </NavContainer>
      </Navbar>

      <Body>
        <div style={{ display: 'grid', gap: '24px', alignItems: 'center' }}>
          <Title />

          <Code isOpened={isOpened} theme={theme} file={title_txt} />

          <IconContainer>
            {i.map((icon) => {
              return <Icon key={icon} theme={theme} id={icon} />;
            })}
          </IconContainer>
          <Code isOpened={isOpened} theme={theme} file={icon_txt} />

          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
          >
            <Button icon='calendar' theme={theme} variant='outline' />
            <Button icon='map' theme={theme} variant='outline' />
            <Button icon='edit' theme={theme} variant='outline' />
            <Button icon='stars' theme={theme} variant='outline'>
              Stargaze
            </Button>
          </div>

          <Code isOpened={isOpened} theme={theme} file={button_txt} />

          <BtnGroup theme={theme} line>
            <Button icon='edit' theme={theme}>
              Edit
            </Button>
            <Button icon='copy' theme={theme}>
              Copy
            </Button>
            <Button icon='paste' theme={theme}>
              Paste
            </Button>
          </BtnGroup>

          <Code isOpened={isOpened} theme={theme} file={buttongroup_txt} />

          <BtnGroup theme={theme}>
            <Button icon='coffee' theme={theme} />
            <Button icon='meter' theme={theme} />
            <Button icon='settings' theme={theme} />
            <Button icon='camera' theme={theme} />
          </BtnGroup>

          <Code isOpened={isOpened} theme={theme} file={btngroupicon_txt} />

          <div
            style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
          >
            <Toggle theme={theme} />
            <Radio theme={theme} />
          </div>
          <Code isOpened={isOpened} theme={theme} file={toggleselect_txt} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Clock size={150} theme={theme} />
            <Clock size={150} circle theme={theme} />
          </div>
          <Code isOpened={isOpened} theme={theme} file={clock_txt} />

          <Calendar theme={theme} />
          <Code isOpened={isOpened} theme={theme} file={calendar_txt} />
        </div>

        <a
          href=' https://amandasaenz.github.io/'
          style={{
            textDecoration: 'none',
            margin: '0 auto',
            fontStyle: 'italic',
          }}
        >
          <Typography variant='link'>https://amandasaenz.github.io/</Typography>
        </a>
      </Body>
    </>
  );
}

export default App;

const Body = styled.div`
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05rem;
  padding: 112px 16px 48px 16px;
  display: grid;
  gap: 48px;
  box-sizing: border-box;

  @media screen and (min-width: 500px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  gap: 32px;

  @media screen and (max-width: 460px) {
    column-gap: 8px;
    row-gap: 16px;
  }
`;

export const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  // @media screen and (min-width: 450px) {
  //   max-width: 500px;
  // }
`;
