import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'https://esm.sh/remark-gfm@3';

const ViewRepo = ({ data, setSelectedRepo }) => {
  const [readMe, setReadme] = useState(false);
  useEffect(() => {
    const getReadMe = async () => {
      await fetch(
        `https://raw.githubusercontent.com/${data.full_name}/master/README.md`
      )
        .then((res) => res.text())
        .then((res) => setReadme(res));
    };
    getReadMe();
  }, [data]);

  return (
    <Wrapper>
      <GoBack
        onClick={() => {
          setSelectedRepo(false);
        }}
      >
        Go back
      </GoBack>
      <Title>{data.full_name}</Title>
      <Message>{data.description}</Message>
      <Author>By: {data.owner.login}</Author>
      <LastCommit>Last updated: {data.updated_at}</LastCommit>

      {readMe && (
        <>
          {' '}
          <MarkDownContainer>
            <ReactMarkdown children={readMe} remarkPlugins={[remarkGfm]} />
          </MarkDownContainer>
        </>
      )}
    </Wrapper>
  );
};

//TODO: Styling the components to conform to company standards.
const Wrapper = styled.div`
  width: 90%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GoBack = styled.button``;
const Title = styled.h1`
  font-size: x-large;
`;

const Message = styled.h2`
  font-size: medium;
  margin: 0.25rem 0 1rem 0;
`;

const Author = styled.h3`
  margin: 0.25rem 0 1.25rem 0;
`;

const LastCommit = styled.h3`
  text-decoration: underline;
`;

const MarkDownContainer = styled.div`
  width: 600px;
  height: 900px;
  overflow: auto;
  border: 2px solid;
  margin: 1rem;
`;
export default ViewRepo;
