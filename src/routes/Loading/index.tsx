import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {Bar} from 'react-native-progress';

import AnimatedLottieView from 'lottie-react-native';
import {ThemeProvider} from 'styled-components';

import {useTheme} from '@hooks/useTheme';

import {Container, LoadingIcon, LoadingText} from './styles';

interface LoadingProps {
  message: string | number;
}

const Loading: React.FC<LoadingProps> = ({message}) => {
  const ref = useRef<AnimatedLottieView>(null);
  const theme = useTheme();

  useEffect(() => {
    ref.current?.play(65, 116);
  }, [ref]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LoadingIcon ref={ref} />
        {message && (
          <LoadingText>
            {typeof message === 'string' ? message : 'Baixando atualização:'}
          </LoadingText>
        )}
        {(message === 'Iniciando download...' ||
          typeof message === 'number') && (
          <Bar
            width={256}
            color={theme.green}
            borderColor={theme.green}
            indeterminate={message === 'Iniciando download...'}
            progress={typeof message === 'number' ? message / 100 : 1}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Loading;
