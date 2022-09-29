import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ViewRepo from './ViewRepo';

const SplashScreen = () => {
  //Store the data in a state to allow for conditional renders.
  const [repoData, setRepoData] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState();

  // Storing the data retreieved from /repos as a state, allowing conditional rendering.
  useEffect(() => {
    //FETCH the data from /repos, sort it in reverse-chrono, and store it in a state.
    const getInfoFromApi = async () => {
      await fetch('/repos')
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            //Using 400 here as an arbitrary error code.
            return 400;
          }
        })
        .then((res) => {
          if (res === 400) {
            setRepoData(400);
            return;
          }

          const sortedInReverseChronological = res.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setRepoData(sortedInReverseChronological);
        });
    };
    getInfoFromApi();
  }, []);

  return (
    <Wrapper>
      {!repoData && 'Loading. Please wait.'}
      {repoData === 400 && 'An error occurred. Please try again.'}
      {repoData && !selectedRepo && repoData !== 400 && (
        <>
          Select a repo
          <Container>
            {repoData.map((e) => (
              <SingleRepo
                onClick={() => {
                  setSelectedRepo(e);
                }}
                key={e.id}
              >
                <ContainerText>
                  <p>Name:</p>
                  {e.name}
                </ContainerText>
                <ContainerText>
                  <p>Description:</p>
                  {e.description}
                </ContainerText>
                <ContainerText>
                  <p>Language:</p>
                  {e.language}
                </ContainerText>
                <ContainerText>
                  <p># of forks:</p>
                  {e.forks}
                </ContainerText>
              </SingleRepo>
            ))}
          </Container>
        </>
      )}

      {selectedRepo && (
        <ViewRepo data={selectedRepo} setSelectedRepo={setSelectedRepo} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.ul`
  width: 90%;
  min-height: 300px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  border: solid 2px;
  margin: 1rem;
`;

const ContainerText = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0.25rem;
`;

const SingleRepo = styled.li`
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  padding: 0 2rem;
  margin: 0.5rem;
  border: solid lightgray;
`;
export default SplashScreen;
