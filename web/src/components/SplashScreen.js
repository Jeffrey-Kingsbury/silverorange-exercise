import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ViewRepo from './ViewRepo';

const SplashScreen = () => {
  //Store the data in a state to allow for conditional renders.
  const [repoData, setRepoData] = useState(false);
  const [renderedRepos, setRenderedRepos] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(false);
  const [usedLanguages, setUsedLanguages] = useState(false);
  const [filter, setFilter] = useState(false);

  // Storing the data retreieved from /repos as a state, allowing conditional rendering.
  useEffect(() => {
    const languages = new Set();
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
            languages.add(a.language);
            return new Date(b.created_at) - new Date(a.created_at);
          });

          //Convert the Set of languages found to an array for later.
          setUsedLanguages(Array.from(languages));
          //store the filtered array
          setRepoData(sortedInReverseChronological);
          //On load were storing the filtered array here as well, and using this to render.
          //Later we can use filter on the repoData to change what is rendered.
          setRenderedRepos(sortedInReverseChronological);
        });
    };
    getInfoFromApi();
  }, []);

  //Function to filter the rendered repos by language
  const filterBy = (language) => {
    //If the filter is already active and the user clicks the button again, remove the filter.
    if (filter === language) {
      setFilter(false);
      setRenderedRepos(repoData);
      return;
    }

    //Filter the languages.
    setFilter(language);
    const filtered = repoData.filter((e) => {
      return e.language === language;
    });

    setRenderedRepos(filtered);
  };

  return (
    <Wrapper>
      {!repoData && 'Loading. Please wait.'}
      {repoData === 400 && 'An error occurred. Please try again.'}
      {renderedRepos && !selectedRepo && repoData !== 400 && (
        <>
          Filter by language
          <FilterContainer>
            {usedLanguages.map((e) => {
              return (
                <FilterButtons
                  active={filter === e}
                  onClick={() => {
                    filterBy(e);
                  }}
                  key={e}
                >
                  {e}
                </FilterButtons>
              );
            })}
          </FilterContainer>
          Select a repo
          <Container>
            {renderedRepos.map((e) => (
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

//TODO: Styling the components to conform to company standards.
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
  cursor: pointer;
`;

const FilterContainer = styled.ul`
  width: 90%;
  height: 6rem;
  border: 2px solid;
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FilterButtons = styled.li`
  cursor: pointer;
  border: 2px solid;
  padding: 0.5rem;
  background-color: ${(props) => (props.active ? 'lightgreen' : '')};
`;
export default SplashScreen;
