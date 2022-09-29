import styled from 'styled-components';
import { useEffect } from 'react';

const SplashScreen = () => {
    useEffect(() => {
        const getInfoFromApi = async () => {
            await fetch('/repos')
                .then((res) => res.json())
                .then((res) => console.log(res));
        };
        getInfoFromApi();
    }, []);
    return <Wrapper>test</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SplashScreen;
