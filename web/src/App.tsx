import styled from 'styled-components';
import './App.css';
import SplashScreen from './components/SplashScreen';

export function App() {
  return (
    <WRAPPER>
      <SplashScreen />
    </WRAPPER>
  );
}

const WRAPPER = styled.div`
  width: 100vw;
  height: 100vh;
`;
