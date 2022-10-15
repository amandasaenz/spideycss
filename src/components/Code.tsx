import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { a, SpringValue, useSpring } from 'react-spring';
import { ThemeMode } from '../themes/Themes';

interface Props {
  file?: string;
  isOpened?: boolean;
  theme?: ThemeMode;
}

const Code: React.FC<Props> = ({ ...props }) => {
  const [text, setText] = useState<string>('hello world');

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const fetchText = async (file?: string) => {
      const response = file
        ? await fetch(file).then((x) => x.text())
        : 'error! no .txt file was loaded... load your .txt file using the "file" property';
      setText(response);
    };
    fetchText(props.file).catch(console.error);
    setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    setHeight(ref.current.getBoundingClientRect().height);
  }, [props.isOpened]);

  const open = useSpring<SpringValue>({
    height: props.isOpened ? height : 0,
  });

  return (
    <Container style={{ ...open }} theme={props.theme}>
      <CodeStyle ref={ref}>
        <code>{text}</code>
      </CodeStyle>
    </Container>
  );
};

export default Code;

const Container = styled(a.div)<Props>`
  background-color: ${(p) => p.theme.hover};
  color: ${(p) => p.theme.primary};
  overflow: auto;

  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none;
`;

const CodeStyle = styled(a.div)<Props>`
  padding: 16px;
  box-sizing: border-box;
  white-space: pre;
`;
